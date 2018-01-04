import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import App from '../containers/App';
import PageNotFound from "../components/PageNotFound";
import '../scss/App.css';

const Root = ({ store }) => (
  <Provider store={store} >
    <div className="readable">
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/category/*" component={App}/>
        <Route component={PageNotFound}/>
      </Switch>
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;