import React, { Component } from 'react';
import { connect } from "react-redux";
import {fetchPostById, handleAddPost, handleEditPost } from "../actions/index";
import FormPost from "../components/FormPost";
import * as CategoryHelper from "../utils/helpers/categories";
import * as PostHelper from "../utils/helpers/posts";

/**
 * Functional component used to display the post form.
 * @extends React
 */
class FormPostDisplay extends Component {
  componentDidMount() {
    const { postId, fetchPostById } = this.props;

    if (postId) {
      fetchPostById(postId);
    }
  }

  render() {
    const { post={}, categories=[], handleAddPost, handleEditPost } = this.props;

    return (
      <FormPost post={post}
        categories={categories}
        handleAddPost={handleAddPost}
        handleEditPost={handleEditPost}
      />
    )
  }
}

function mapStateToProps( state, ownProps ) {
  const { categories, posts } = state;
  const post = PostHelper.formatPost(posts);
  const postId = ownProps.match.params.post_id;

  return {
    post,
    postId,
    categories: CategoryHelper.getAllCategories(categories)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleAddPost: data => handleAddPost(data, dispatch, ownProps),
    handleEditPost: data => handleEditPost(data, dispatch, ownProps),
    fetchPostById: id => fetchPostById(id, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPostDisplay);