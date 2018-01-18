import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import Posts from '../components/Posts';
import * as PostsHelper from '../utils/helpers/posts';

class PostsDisplay extends Component {
  componentDidMount() {
    const { category, fetchPosts } = this.props;
    fetchPosts(category);
  }
  componentWillReceiveProps(prevProps) {
    const { category, fetchPosts } = this.props;
    if (prevProps.category !== category) {
      fetchPosts(prevProps.category);
    }
  }
  render() {
    const { posts, category } = this.props;
    return (
      <Posts posts={posts}
        category={category}
      />
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const category = ownProps.match.params.category || 'all';
  const { posts } = state;

  return {
    category,
    posts: PostsHelper.formatPosts(posts)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: data => fetchPosts(data, dispatch)
  }
}

export default withRouter (
  connect(mapStateToProps, mapDispatchToProps)(PostsDisplay)
);
