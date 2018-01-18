import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import thunk from 'redux-thunk';
import Root from './containers/Root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      createLogger(),
      thunk
    )
  )
);

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>
, document.getElementById('root'));
registerServiceWorker();
