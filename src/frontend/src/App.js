import { React, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './AppRouter';
import Auth from './components/Auth';
import history from './utils/history';

const App = ({ authToken }) => {
	const loggedIn = authToken;

	useEffect(async () => {
		const script = document.createElement('script');

		script.src = '//fast.appcues.com/110531.js';
		script.async = false;

		document.head.appendChild(script);
	}, []);

	return (
		<div className={loggedIn ? 'flex h-screen bg-gray-50' : 'bg-gray-50'}>
			<ToastContainer autoClose={2500} position="top-right" closeButton={false} />
			<Router history={history}>{loggedIn ? <AppRouter /> : <Auth />}</Router>
		</div>
	);
};

const mapStateToProps = ({ auth }) => ({ authToken: auth.token });

export default connect(mapStateToProps)(App);
