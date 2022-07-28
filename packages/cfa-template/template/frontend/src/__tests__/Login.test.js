import React from "react";
import * as redux from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import { Login } from "../components/Login";
import fetch from "node-fetch";

import "../../__mocks__/sessionStorage";
const fetchSpy = jest.spyOn(fetch, "default");

describe("Login component", () => {
    beforeAll(() => {
        if (!process.env.REACT_APP_API_BASE_URL)
            process.env.REACT_APP_API_BASE_URL = "http://localhost:3001/dev";
    });

    it("renders create account option", () => {
        const { queryByText, getByText } = render(<Login />);

        expect(queryByText(/Create account./i)).toBeTruthy();
        fireEvent.click(getByText(/Create account./i));
    });

    it("creates a demo user - nock intercepts", async () => {
        const scope = nock(process.env.REACT_APP_API_BASE_URL)
            .post(/.create/)
            .reply(200, {
                token: "nock.create.someothersupertoken2124532131thatgitguardianwontthrowawarningagainst",
            });

        const { queryByText, getByText, findByText } = render(
            <Login authToken={null} />
        );

        expect(queryByText(/Create account./i)).toBeTruthy();
        await userEvent.click(getByText(/Create account./i));

        scope.isDone();

        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringMatching(/user\/create/),
            expect.objectContaining({
                body: '{"username":"demo@lefthook.com","password":"demo"}',
            })
        );
    });

    it("logs in as a demo user", async () => {
        const mockDispatchFn = jest.fn();
        const useDispatchSpy = jest.spyOn(redux, "useDispatch");
        useDispatchSpy.mockReturnValue(mockDispatchFn);
        const history = { push: jest.fn() };
        const fakeToken =
            "nock.login.someothersupertoken2124532131thatgitguardianwontlaunchawarningagainst";

        const scope = nock(process.env.REACT_APP_API_BASE_URL)
            .post(/.login/)
            .reply(200, {
                token: fakeToken,
            });

        const { getByTestId } = render(
            <Login
                authToken={null}
                dispatch={useDispatchSpy}
                history={history}
            />
        );

        await userEvent.click(getByTestId("login-button"));

        scope.isDone();

        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringMatching(/user\/login/),
            expect.objectContaining({
                body: '{"username":"demo@lefthook.com","password":"demo"}',
            })
        );
    });
});
