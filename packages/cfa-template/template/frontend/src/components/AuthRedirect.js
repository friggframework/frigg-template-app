import React, { Component, useState} from 'react';
import { connect } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import qString from 'query-string';
import { setAuthToken } from '../actions/auth';
import API from '../api/api';

function withParams(Component) {
	return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}
// handle the redirect that comes back from authing to Scrive or Hubspot.
class RedirectFromAuth extends Component {

	constructor(props) {
		super(props);
		this.params = qString.parse(window.location.search);
		this.app = this.props.params.app;

		this.authToken = sessionStorage.getItem('jwt');
		this.api = new API();
		if (this.authToken) {
			this.props.dispatch(setAuthToken(this.authToken));
			this.api.setJwt(this.authToken);
		}
	}


	async componentDidMount() {

		if (this.params.code) {
			// Authenticate target entity

			const type = this.app;
			const targetEntity = await this.api.authorize(type, {
				code: this.params.code,
			});

			const config = {
				type,
			};
			// TODO change, for now using the target entity twice
			const integration = await this.api.createIntegration(targetEntity.entity_id, targetEntity.entity_id, config);

			if (!integration.error) {
				console.log('Should redirect to /integrations')
				this.props.navigate('/integrations');
			} else {
				alert(integration.error);
			}
		}
	}

	render() {
		return (
			<div className="container">
				<div id="card-wrap" className="card">
					<div className="card-body">
						<h2>{this.app}</h2>
					</div>
				</div>
			</div>
			// <Redirect to='/manageAuth' />
		);
	}
}

// this function is used by redux connect() and tells the component
// which values we want to map from the store into props
function mapStateToProps({ auth }) {
	return {
		authToken: auth.token,
	};
}

// connects this component to the redux store.
export default connect(mapStateToProps)(withParams(RedirectFromAuth));
