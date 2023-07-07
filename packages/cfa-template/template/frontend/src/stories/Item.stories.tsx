import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Item } from '../components/Integration';

export const MockedState = {
  auth: { token: 'test-token' },
};

const args = {
  layout: 'horizontal',
  data: {
    display: {
      name: 'Salesforce',
      description: 'Sales & CRM',
      icon: 'https://friggframework.org/assets/img/salesforce.jpeg',
    },
  },
};

const Mockstore = ({ authState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        auth: createSlice({
          name: 'auth',
          reducers: {},
          initialState: authState,
        }).reducer,
      }
    })}
  >
    {children}
  </Provider>
);

export default {
  args,
  title: 'Item',
  component: Item,
  excludeStories: /.*MockedState$/,
};

export const Horizontal = {
  decorators: [
    (story) => <Mockstore authState={MockedState}>{story()}</Mockstore>,
  ],
};

export const Vertical = {
  args: { ...args, layout: 'vertical' },
  decorators: [
    (story) => <Mockstore authState={MockedState}>{story()}</Mockstore>,
  ],
};

export const Row = {
  args: { ...args, layout: 'row' },
  decorators: [
    (story) => <Mockstore authState={MockedState}>{story()}</Mockstore>,
  ],
};
