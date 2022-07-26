/**
 * @jest-environment jsdom
 */
import "@babel/polyfill"; // otherwise referenceError: regeneratorRuntime is not defined
import path from "path";
import { fireEvent, render, screen, act } from "@testing-library/react";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import fetch from "node-fetch";
import { Login } from "../components/Login";

jest.mock("node-fetch");

// use for printing the component's HTML
// screen.debug();

describe("Login component", () => {
    beforeAll(() => {
        nock.back.fixtures = path.join(__dirname, "nockFixtures");
    });

    afterEach(() => {
        nock.restore(); // see Memory issues with Jest https://github.com/nock/nock#memory-issues-with-jest
    });

    it("renders create account option", () => {
        const { queryByText, getByText } = render(<Login />);

        expect(queryByText(/Create account./i)).toBeTruthy();
        fireEvent.click(getByText(/Create account./i));
    });

    it("creates a demo user - nock intercepts", async () => {
        const scope = nock("http://localhost:3001/dev/user/")
            .post(/create./)
            .reply(200, {
                token: "eyJpZCI6IjYyZTA0NGM4ZWJhNjgxYjE1MzRkMTNmYSIsInRva2VuIjoiNWM4NTNhNWRhM2I1Yzk2MTA1ZDU5MDlkOGMzYTQzZTUwNWJkMjIwNCJ9",
            });

        const { queryByText, getByText, findByText } = render(
            <Login authToken={null} />
        );

        expect(queryByText(/Create account./i)).toBeTruthy();
        await userEvent.click(getByText(/Create account./i));

        expect(fetch).toHaveBeenCalled();
        scope.isDone();

        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/user\/create/),
            expect.objectContaining({
                body: '{"username":"demo@lefthook.com","password":"demo"}',
            })
        );

        // probably toast exists somewhere outside the login component
        // const toastAlert = await findByText(/wurst./);
        // expect(toastAlert).toBeInTheDocument();
    });

    it.skip("creates a demo user - jest mocks fetch", async () => {
        const promise = Promise.resolve({
            status: 200,
            data: {
                token: "eyJpZCI6IjYyZTA0NGM4ZWJhNjgxYjE1MzRkMTNmYSIsInRva2VuIjoiNWM4NTNhNWRhM2I1Yzk2MTA1ZDU5MDlkOGMzYTQzZTUwNWJkMjIwNCJ9",
            },
        });
        fetch.mockImplementationOnce(() => promise);

        const { queryByText, getByText, findByText } = render(
            <Login authToken={null} />
        );

        expect(queryByText(/Create account./i)).toBeTruthy();
        await userEvent.click(getByText(/Create account./i));
        await act(() => promise);
        expect(fetch).toHaveBeenCalled();
        // expect(fetch).toHaveBeenCalledWith("undefined/user/create", {
        //     body: '{"username":"demo@lefthook.com","password":"demo"}',
        //     headers: { "Content-Type": "application/json" },
        //     method: "POST",
        // });
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/user\/create/),
            expect.objectContaining({
                body: '{"username":"demo@lefthook.com","password":"demo"}',
            })
        );

        // probably toast exists somewhere outside the login component
        // const toastAlert = await findByText(/wurst./);
        // expect(toastAlert).toBeInTheDocument();
    });
});
