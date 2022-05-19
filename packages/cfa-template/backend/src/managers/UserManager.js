const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { get } = require('@friggframework/assertions');
const Token = require('../models/Token');
const User = require('../models/User');
const IndividualUser = require('../models/IndividualUser');
const OrganizationUser = require('../models/OrganizationUser');
const Boom = require('@hapi/boom');

class UserManager {
    constructor(params) {
        this.user = null;
        this.userMO = new User();
        this.tokenMO = new Token();
        this.individualUserMO = new IndividualUser();
        this.organizationUserMO = new OrganizationUser();

        return (async () => {
            const token = get(params, 'token', null);

            if (token) {
                const jsonToken =
                    Token.getJSONTokenFromBase64BufferToken(token);
                const sessionToken =
                    await this.tokenMO.validateAndGetTokenFromJSONToken(
                        jsonToken
                    );
                this.individualUser = await this.individualUserMO.get(
                    sessionToken.user
                );
            }

            return this;
        })();
    }

    getUserId() {
        return this.individualUser.id;
    }

    isLoggedIn() {
        return this.individualUser !== null;
    }

    static async createIndividualUser(params) {
        const userManager = await new UserManager({});
        const email = get(params, 'email', null);
        const username = get(params, 'username', null);
        if (!email && !username) {
            throw Boom.badRequest('email or username is required');
        }
        const password = get(params, 'password');
        const appUserId = get(params, 'appUserId', null);
        const organizationUserId = get(
            params,
            'organizationUserId',
            null
        );

        const user = await userManager.individualUserMO.create({
            email,
            username,
            password,
            appUserId,
            organizationUser: organizationUserId,
        });
        userManager.individualUser = user;
        return userManager;
    }

    static async createOrganizationUser(params) {
        const userManager = await new UserManager({});
        const name = get(params, 'name');
        const appOrgId = get(params, 'appOrgId');

        const user = await userManager.organizationUserMO.create({
            name,
            appOrgId,
        });
        userManager.organizationUser = user;
        return userManager;
    }

    // returns a User Manager if the user credentials are correct otherwise throws an exception
    static async loginUser(params) {
        const userManager = await new UserManager({});
        const username = get(params, 'username');
        const password = get(params, 'password');

        const user = await userManager.individualUserMO.getUserByUsername(
            username
        );

        if (!user) {
            throw Boom.unauthorized('username does not exist');
        }

        const isValid = await bcrypt.compareSync(password, user.hashword);
        if (!isValid) {
            throw Boom.unauthorized('incorrect password');
        }

        userManager.individualUser = user;
        return userManager;
    }

    async createUserToken(minutes) {
        const rawToken = crypto.randomBytes(20).toString('hex');
        const createdToken = await this.tokenMO.createTokenWithExpire(
            this.individualUser.id,
            rawToken,
            120
        );

        // Return Session
        const tokenBuf = Token.createBase64BufferToken(createdToken, rawToken);
        return tokenBuf;
    }
}

module.exports = UserManager;
