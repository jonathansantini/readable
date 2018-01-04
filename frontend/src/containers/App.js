import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategory, setCategoryName } from '../actions/index';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Posts from '../components/Posts';
import { withRouter } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      posts: [],
      category: {}
    };
  }
  componentWillMount() {
    const { setCategory, category } = this.props;
    setCategory(category.name);
  }
  handleCategoryChange = cat => {
    this.props.setCategory(cat)
  }
  render() {
    const { categories = [], posts = [] } = this.props;

    return (
      <div className="content">
        <Header />
        <Categories categories={categories}
          handleCategoryChange={this.handleCategoryChange}
        />
        <Posts posts={posts} />
      </div>
    );
  }
}

function mapStateToProps( data, ownProps ) {
  const { categories, posts } = data;
  const { match } = ownProps;
  const name = (match && match.params) ? match.params[0] : '';

  return {
    posts,
    categories,
    category: {
      name
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategory: (data) => dispatch(setCategory(data))
  }
}

export default withRouter (
  connect(mapStateToProps, mapDispatchToProps)(App)
);
