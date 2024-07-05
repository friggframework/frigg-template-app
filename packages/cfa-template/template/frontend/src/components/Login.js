import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import serializeForm from "form-serialize";
import FormValidator from "./FormValidator";
import API from "../api/api";
import { setAuthToken } from "../actions/auth";
import config from "../frigg.config";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./LoadingSpinner";

// login component is a place for a user to enter a username and password
export class Login extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "username",
        method: "isEmpty",
        validWhen: false,
        message: "Username is required.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "Password is required.",
      },
      {
        field: "password",
        method: "isLength",
        args: [{ min: 4 }],
        validWhen: true,
        message: "Password must be at least 4 characters",
      },
    ]);

    this.state = {
      password: "",
      username: "",
      validation: this.validator.valid(),
      defaultUsername: "demo@lefthook.com",
      defaultPassword: "demo",
      submitted: false,
    };
  }

  componentDidMount() {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      this.props.dispatch(setAuthToken(jwt)); // dispatch the auth token to the store
      this.props.history.push("/integrations");
    }
  }

  passwordMatch = (confirmation, state) => state.password === confirmation;

  // when form inputs change, this method handles validating them
  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // call the api to login with the credentials
  login = async (username, password) => {
    // handle actual form submission here
    if (!username || !password) {
      return toast.error("Please fill in all the fields");
    }

    const api = new API();

    try {
      const data = await api.login(username, password);

      if (data.token) {
        const { token } = data;
        sessionStorage.setItem("jwt", token);
        this.props.dispatch(setAuthToken(token)); // dispatch the auth token to the store
        this.props.history.push("/dashboard");
      } else {
        return toast.error(
          `Failed to login using this base url: ${process.env.REACT_APP_API_BASE_URL}`
        );
      }
    } catch (e) {
      return toast.error("Login failed. Incorrect username or password");
    }
  };

  // form submission method, ultimately unpacks form values and calls login method
  handleFormSubmit = async (event) => {
    event.preventDefault();

    const values = serializeForm(event.target, { hash: true });

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.state.submitted = true;

    if (validation.isValid) {
      // TODO .. idk if this works
    }

    // attempt login
    await this.login(values.username, values.password);
  };

  handleDemoSubmit = async (event) => {
    event.preventDefault();

    const values = serializeForm(event.target, { hash: true });

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.state.submitted = true;

    await this.login(this.state.defaultUsername, this.state.defaultPassword);
  };
  createDemoUser = async () => {
    // handle actual form submission here

    const api = new API();

    try {
      const data = await api.createUser("demo@lefthook.com", "demo");

      if (data.token) {
        return toast.success("New user created! please login.");
      } else {
        return toast.error(
          "Creating a user failed. (its possible this user already exists...)"
        );
      }
    } catch (e) {
      return toast.error("Login failed. Incorrect username or password");
    }
  };

  render() {
    const validation = this.validator.validate(this.state);

    return (
      <div className="h-screen relative flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-12 w-[420px]">
          <div className="flex w-full justify-center">
            <img
              src="https://9061955.fs1.hubspotusercontent-na1.net/hubfs/9061955/Asigra%20logos%20and%20favicons/SaaSAssure%20Logos/SaasAssure_Final_Logo_primary_tagline.png"
              alt="Logo"
              style={{ width: 250 }}
            />
          </div>

          <form className="my-10" onSubmit={this.handleFormSubmit}>
            <h3 className="text-xl mb-4 text-l font-semibold text-gray-700">
              Login
            </h3>

            <div className="flex flex-col mb-2 gap-5">
              <label className="block text-sm">
                <span className="text-gray-700">Email</span>
                <Input
                    data-testid="email-input"
                    className="block  mt-1 w-full text-sm form-input rounded-lg"
                    defaultValue={this.state.defaultUsername}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                />
              </label>
              <label className="block text-sm">
                <span className="text-gray-700">Password</span>
                <Input
                    data-testid="password-input"
                    className="block w-full mt-1 text-sm form-input rounded-lg"
                    defaultValue={this.state.defaultPassword}
                    type="password"
                    name="password"
                    placeholder="***************"
                    onChange={this.handleInputChange}
                />
              </label>

              <Button
                  data-testid="login-button"
                  type="submit"
                  className="w-full"
              >
                {this.state.submitted && <LoadingSpinner/>}
                Log In
              </Button>

              <p className="mt-8">
                <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                  Forgot your password?
                </span>
                <p className="mt-1">
                  {/* <Link className="text-sm font-medium text-purple-800 hover:underline cursor-pointer" to="/register">
									Create account
								</Link> */}
                  <span className="text-sm font-medium text-primary hover:underline cursor-pointer"
                        onClick={this.createDemoUser}>
									Create account (demo user)
								</span>
                </p>

              </p>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

// this function defines which of the redux store items we want,
// and the return value returns them as props to our component
function mapStateToProps({auth}) {
  return {
    authToken: auth.token,
  };
}

// connects this component to the redux store.
export default connect(mapStateToProps)(Login);
