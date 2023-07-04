import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from './IntegrationItem';
import IntegrationSkeleton from './IntegrationSkeleton';
import { setIntegrations } from '../../actions/integrations';
import IntegrationUtils from '../../utils/IntegrationUtils';
import API from '../../api/api';
import { logoutUser } from '../../actions/logout';
import { setAuthToken } from '../../actions/auth';
import config from '../../frigg.config';

function IntegrationList({ integrationType }) {
  const dispatch = useDispatch();
  const [authToken, integrations] = useSelector(({ auth, integrations }) => [auth.token, integrations]);
  const [displayedIntegrations, setDisplayedIntegrations] = useState(null);
  const [installedIntegrations, setInstalledIntegrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jwt = sessionStorage.getItem('jwt');
      if (jwt) {
        if (jwt !== authToken) {
          dispatch(setAuthToken(jwt));
        }
        refreshIntegrations();
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (integrations) {
      let integrationUtils = new IntegrationUtils(integrations.integrations);
      integrationUtils.getPossibleIntegrations();
    
      if (integrationUtils) {
        setDisplayedIntegrations(renderCombinedIntegrations(
          integrationUtils.getActiveAndPossibleIntegrationsCombined()
        ));
      }
    }
  }, [integrations]);

  const refreshIntegrations = async () => {
    const api = new API();
    const jwt = sessionStorage.getItem('jwt');
    api.setJwt(jwt);
    const integrations = await api.listIntegrations();
    if (integrations.error) dispatch(logoutUser());
    dispatch(setIntegrations(integrations));
  }

  const setInstalled = (data) => {
    const items = [data, ...installedIntegrations];
    setInstalledIntegrations({ installedIntegrations: items });
  };

  const integrationComponent = (integration) => (
    <Item
      data={integration}
      handleInstall={setInstalled}
      refreshIntegrations={refreshIntegrations}
      key={`combined-integration-${integration.type}`}
      layoutStyle={'default-row'} />
  );

  const renderCombinedIntegrations = (combinedIntegrations) => {
    if (integrationType == 'Recently added') {
      return combinedIntegrations.map((integration) => integrationComponent(integration));
    }
    if (integrationType == 'Installed') {
      return installedIntegrations.map((integration) => integrationComponent(integration));
    }
    return combinedIntegrations
      .filter((integration) => integration.display.description == integrationType)
      .map((integration) => integrationComponent(integration));
  };

  return (
    <>
      {displayedIntegrations || (
        <div className="grid gap-6 lg:col-span-1 lg:grid-cols-1 xl:col-span-2 xl:grid-cols-2 2xl:col-span-3 2xl:grid-cols-3">
          {Array.from(Array(9), (_, i) =>
            <IntegrationSkeleton key={i} layout={config.componentLayout} />
          )}
        </div>
      )}
      {displayedIntegrations?.length == 0 && (
        <p>No {integrationType} integrations found.</p>
      )}
    </>
  );
}

export default IntegrationList;
