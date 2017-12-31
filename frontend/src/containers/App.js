import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { addPost, fetchCategoriesPosts } from '../actions/index';
import Header from '../components/Header';
import PageNotFound from '../components/PageNotFound';
import Categories from '../components/Categories';
import Posts from '../components/Posts';
import '../scss/App.css';

class App extends Component {

  componentWillMount() {
    this.props.fetchCategoriesPosts();
  }

  render() {
    const { categories = [], posts = [] } = this.props;
    return (
      <div className="readable">
        <Header />
        <Switch>
          <Route exact path="/" render={() => (
            <div className="index">
              <Categories categories={categories} />
              <Posts posts={posts} />
            </div>
          )}/>
          <Route exact path="/test" render={() => (
            <Categories categories={categories} />
          )}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps( data ) {
  const { categories, posts } = data;
  return {
    posts,
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    fetchCategoriesPosts: (data) => dispatch(fetchCategoriesPosts(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
