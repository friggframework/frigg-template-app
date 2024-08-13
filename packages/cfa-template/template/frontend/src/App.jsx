import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  ApplicationProvider,
  FormProvider,
  IntegrationProvider,
} from './context';
import { Toaster } from './components/ui/toaster';
import { AppLayout } from './AppLayout.jsx';

const App = () => {
  return (
    <div className={'flex h-screen bg-gray-50'}>
      <ApplicationProvider>
        <IntegrationProvider>
          <FormProvider>
            <Toaster position="top-right" />
            <Router>
              <AppLayout />
            </Router>
          </FormProvider>
        </IntegrationProvider>
      </ApplicationProvider>
    </div>
  );
};

export default App;
