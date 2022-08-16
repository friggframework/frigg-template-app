import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showModalForm } from '../../actions/modalForm';
import { setIntegrations } from '../../actions/integrations';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Api from '../../api/api';
import ToggleSwitch from './ToggleSwitch';

function IntegrationHorizontal(props) {
	const { name, description, category, icon } = props.data.display;
	const { hasUserConfig, type } = props.data;

	const [isProcessing, setIsProcessing] = useState(false);
	const [status, setStatus] = useState(props.data.status);
	const [installed, setInstalled] = useState([]);

	const api = new Api();
	api.setJwt(props.authToken)

	const getAuthorizeRequirements = async () => {
		setIsProcessing(true);
		const authorizeData = await api.getAuthorizeRequirements(type, 'connectwise');
		if (authorizeData.type === 'oauth2') {
			window.location.href = authorizeData.url;
		}
		if (authorizeData.type !== 'oauth2') enableModalForm();
	};

	const enableModalForm = () => {
		const requestType = getRequestType();

		props.dispatch(showModalForm(true, props.data.id, requestType, props.data.type, props.data.config));
	};

	const getRequestType = () => {
		let type;
		switch (props.data.status) {
			case 'NEEDS_CONFIG':
				type = 'INITIAL';
				break;
			case 'ENABLED':
				type = 'CONFIGURE';
				break;
			default:
				type = 'AUTHORIZE';
		}
		return type;
	};

	const getSampleData = async () => {
		props.history.push(`/data/${props.data.id}`);
	};

	const disconnectIntegration = async () => {
		console.log('Disconnect Clicked!');
		await api.deleteIntegration(props.data.id);
		const integrations = await api.listIntegrations();
		if (!integrations.error) {
			props.dispatch(setIntegrations(integrations));
		}
		setInstalled([]);
		setStatus('');
	};

	const authorizeMock = () => {
		setIsProcessing(true);

		setTimeout(() => {
			setStatus('NEEDS_CONFIG');
			setInstalled([props.data]);
			props.handleInstall(props.data, props.status);
			setIsProcessing(false);
		}, 3000);
	};

	const disconnectMock = () => {
		setInstalled([]);
		setStatus('');
	};

	return (
		<>
			<div data-testid="integration-horizontal" className="flex flex-nowrap p-4 bg-white rounded-lg shadow-xs">
				<img className="mr-3 w-[80px] h-[80px] rounded-lg" alt={name} src={icon} />
				<div className="pr-1 overflow-hidden">
					<p className="w-full text-lg font-semibold text-gray-700 truncate ...">{name}</p>
					<p className="pt-2 text-sm font-medium text-gray-600">{description}</p>
					{status && status === 'NEEDS_CONFIG' && (
						<p className="inline-flex pt-2 text-xs font-medium text-red-300">
							<ExclamationCircleIcon className="w-4 h-4 mr-1" /> Configure
						</p>
					)}
				</div>
				<div className="ml-auto">
					<div className="relative">
						{((status && status === 'ENABLED') || (status && status === 'NEEDS_CONFIG')) && (
								<ToggleSwitch getSampleData={getSampleData} disconnectIntegration={disconnectIntegration} name={name} hasUserConfig={hasUserConfig} />
						)}
						{!status && (
							<button
								onClick={getAuthorizeRequirements}
								className="px-3 py-2 text-xs font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
							>
								{isProcessing ? (
									<svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								) : (
									'Connect'
								)}
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

function mapStateToProps({ auth, integrations }) {
	return {
		authToken: auth.token,
		integrations,
	};
}

export default withRouter(connect(mapStateToProps)(IntegrationHorizontal));
