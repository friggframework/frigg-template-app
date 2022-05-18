import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Login from '../components/Login';

afterEach(() => {
	cleanup();
});

test('logs with demo email and password', async () => {
	const username = 'demo@lefhook.com';
	const password = 'demo';
	const mockLogin = jest.fn();

	render(<Login />);

	const emailInput = screen.getByTestId('email-input');
	userEvent.type(emailInput, username);
	const passwordInput = screen.getByTestId('email-input');
	userEvent.type(passwordInput, password);
	const loginButton = screen.getByTestId('login-button');
	expect(loginButton).not.toBeDisabled();

	userEvent.click(loginButton);

	await expect(mockLogin).toHaveBeenCalled();
	await expect(mockLogin).toHaveBeenCalledTimes(1);
	await expect(mockLogin).toHaveBeenCalledWith('demo@lefhook.com', 'demo');
});

test('matches snapshot: Login.test.js', () => {
	const username = 'demo@lefhook.com';
	const password = 'demo';

	const emailInput = screen.getByTestId('email-input');
	userEvent.type(emailInput, username);
	const passwordInput = screen.getByTestId('email-input');
	userEvent.type(passwordInput, password);
	const loginButton = screen.getByTestId('login-button');
	expect(loginButton).not.toBeDisabled();

	const tree = renderer.create(<Login />).toJSON();
	expect(tree).toMatchSnapshot();
});
