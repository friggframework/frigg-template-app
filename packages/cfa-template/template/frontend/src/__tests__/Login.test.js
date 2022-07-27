import { fireEvent, render, screen, act } from "@testing-library/react";
import nock from "nock";
import userEvent from "@testing-library/user-event";
import fetch from "node-fetch";
import { Login } from "../components/Login";

jest.mock("node-fetch");

// use for printing the component's HTML
// screen.debug();

describe("Login component", () => {
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
                token: "nock.create.someothersupertoken2124532131thatgitguardianwontthrowawarningagainst",
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
        // const toastAlert = await findByText(/New user created./);
        // expect(toastAlert).toBeInTheDocument();
    });

    it("creates a demo user - jest mocks fetch", async () => {
        const promise = Promise.resolve({
            status: 200,
            data: {
                token: "fetch.create.someothersupertoken2124532131thatgitguardianwontlaunchawarningagainst",
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

        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/user\/create/),
            expect.objectContaining({
                body: '{"username":"demo@lefthook.com","password":"demo"}',
            })
        );
    });

    it("logs in as a demo user", async () => {
        const scope = nock(/.user./)
            .post(/.login./)
            .reply(200, {
                token: "nock.login.someothersupertoken2124532131thatgitguardianwontlaunchawarningagainst",
            });

        const { getByTestId } = render(<Login authToken={null} />);

        await userEvent.click(getByTestId("login-button"));

        expect(fetch).toHaveBeenCalled();
        scope.isDone();

        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/user\/login/),
            expect.objectContaining({
                body: '{"username":"demo@lefthook.com","password":"demo"}',
            })
        );
    });
});
