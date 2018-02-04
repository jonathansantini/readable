import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';
import Header from '../components/Header';
import PostDisplay from '../containers/PostDisplay';
import PostsDisplay from '../containers/PostsDisplay';
import FormPostDisplay from '../containers/FormPostDisplay';
import FormCommentDisplay from '../containers/FormCommentDisplay';
import * as CategoryHelper from '../utils/helpers/categories';
import '../scss/App.css';

/**
 * Main class used as the parent component to the app.
 * @extends React.Component
 */
class App extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }
  render() {
    return (
      <div className="readable">
        <Header />
        <Switch>
          <Redirect from='/all' to='/' />
          <Route exact path="/create-post" component={FormPostDisplay} />
          <Route exact path="/:category" component={PostsDisplay} />
          <Route exact path="/:category/create" component={FormPostDisplay} />
          <Route exact path="/:category/:post_id" component={PostDisplay} />
          <Route exact path="/:category/:post_id/edit" component={FormPostDisplay} />
          <Route exact path="/:category/:post_id/create" component={FormCommentDisplay} />
          <Route exact path="/:category/:post_id/edit/:comment_id" component={FormCommentDisplay} />
          <Route exact path="/" component={PostsDisplay} />
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
