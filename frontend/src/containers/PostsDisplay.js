import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts, deletePost, handlePostVote } from '../actions/posts';
import Nav from '../components/Nav';
import Posts from '../components/Posts';
import * as PostsHelper from '../utils/helpers/posts';
import * as CategoryHelper from "../utils/helpers/categories";

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
    const { posts, category, categories, deletePost, postsLoaded, handlePostVote } = this.props;
    return (
      <div className="posts">
        <Nav category={category}
          categories={categories}
        />
        { postsLoaded && (
          <Posts posts={posts}
           category={category}
           deletePost={deletePost}
           handlePostVote={handlePostVote}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const category = ownProps.match.params.category;
  const filter = ownProps.location.hash;
  const { posts, categories } = state;
  const postsArray = PostsHelper.formatPosts(posts);

  return {
    category,
    posts: PostsHelper.filterPosts(postsArray, filter),
    postsLoaded: posts.loaded,
    categories: CategoryHelper.getAllCategories(categories)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: data => deletePost(data, dispatch),
    fetchPosts: data => fetchPosts(data, dispatch),
    handlePostVote: data => handlePostVote(data, dispatch)
  }
}

export default withRouter (
  connect(mapStateToProps, mapDispatchToProps)(PostsDisplay)
);
