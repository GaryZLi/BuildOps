import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { client } from './apolloConfig';
import { ApolloProvider } from '@apollo/client';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import './awsConfig';
import './App.css';

// npm install aws-amplify @aws-amplify/ui-react
// The aws-amplify package is the main library for working with Amplify in your apps. 
// The @aws-amplify/ui-react package includes React specific UI components we’ll use as we build the app.


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
