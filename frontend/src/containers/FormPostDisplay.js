import React, { Component } from 'react';
import { connect } from "react-redux";
import {fetchPostById, handleAddPost, handleEditPost } from "../actions/posts";
import Nav from '../components/Nav';
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
    const { post={}, categories=[], category, handleAddPost, handleEditPost } = this.props;

    return (
      <div className="form-post">
        <Nav category={category}
          categories={categories}
        />
        <FormPost post={post}
          category={category}
          categories={categories}
          handleAddPost={handleAddPost}
          handleEditPost={handleEditPost}
        />
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  const { categories, posts } = state;
  const post = PostHelper.formatPost(posts);
  const postId = ownProps.match.params.post_id;
  const category = ownProps.match.params.category;

  return {
    post,
    postId,
    category,
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