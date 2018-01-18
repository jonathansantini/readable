import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { fetchCategories } from '../actions/index';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PostDisplay from '../containers/PostDisplay';
import PostsDisplay from '../containers/PostsDisplay';
import FormDisplay from '../containers/FormDisplay';
import * as CategoryHelper from '../utils/helpers/categories';
import '../scss/App.css';

class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }
  render() {
    return (
      <div className="readable">
        <Header />
        <Nav {...this.props} />
        <Switch>
          <Route path="/create/:type" component={FormDisplay} />
          <Route path="/edit/:type/:id" component={FormDisplay} />
          <Route path="/:category/:post_id" component={PostDisplay} />
          <Route path="/:category" component={PostsDisplay} />
          <Route path="/" component={PostsDisplay} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  const { categories } = state;

  return {
    categories: CategoryHelper.getAllCategories(categories)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => fetchCategories(data, dispatch)
  }
}

export default withRouter (
  connect(mapStateToProps, mapDispatchToProps)(App)
);
