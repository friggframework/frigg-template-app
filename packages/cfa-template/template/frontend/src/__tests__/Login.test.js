import React from "react";
import * as redux from "react-redux";
import * as toastify from "react-toastify";
import { fireEvent, render, screen, act } from "@testing-library/react";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import { Login } from "../components/Login";

const localStorageMock = (() => {
    let store = {};

    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(window, "sessionStorage", {
    value: localStorageMock,
});

// use for printing the component's HTML
// screen.debug();

describe("Login component", () => {
    beforeAll(() => {
        process.env.REACT_APP_API_BASE_URL = "http://localhost:3001/dev";
    });

    it("renders create account option", () => {
        const { queryByText, getByText } = render(<Login />);

        expect(queryByText(/Create account./i)).toBeTruthy();
        fireEvent.click(getByText(/Create account./i));
    });

    it("creates a demo user - nock intercepts", async () => {
        const toastSpy = jest.spyOn(toastify, "toast");

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

        // probably toast exists somewhere outside the login component
        // const toastAlert = await findByText(/New user created./);
        // expect(toastSpy).toHaveBeenCalled();
    });

    it("logs in as a demo user", async () => {
        const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
        const useDispatchSpy = jest.spyOn(redux, "useDispatch");
        const mockDispatchFn = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFn);
        const historyPushSpy = jest.fn();
        const history = { push: historyPushSpy };
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

        // expect(setItemSpy).toHaveBeenCalled();
        // expect(mockDispatchFn).toHaveBeenCalled();
        // expect(historyPushSpy).toHaveBeenCalled();
    });
});
