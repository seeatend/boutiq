import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'ReduxStore';
import { Boutiq } from './Boutiq';

export const BoutiqApp = () => (
  <Provider store={store}>
    <Boutiq />
  </Provider>
);
