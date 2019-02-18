import React, { Component } from 'react';
import ApplicationNavigator from './navigation';
import Layout from './components/layout';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const Database = require('./database')();

export default class App extends Component {
  componentWillMount() {
    Database.Init();
  }

  render() {
    return (
      <Provider store={store}>
      <Layout>
        <ApplicationNavigator />
      </Layout>
      </Provider>
    );
  }
}
