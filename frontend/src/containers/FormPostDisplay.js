import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPostById, handleAddPost, handleEditPost } from "../actions/posts";
import FormPost from "../components/FormPost";
import PageNotFound from "../components/PageNotFound";
import Loading from '../components/Loading';
import * as CategoryHelper from "../utils/helpers/categories";
import * as PostHelper from "../utils/helpers/posts";
import * as FormHelper from "../utils/helpers/forms";

/**
 * Controlled component used to display the post form.
 * Loads post data if :post_id is provided from React Router.
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
    const { post={}, categories=[], category, handleAddPost, handleEditPost, isValidPost, postLoaded } = this.props;

    return (
      <div className="form-post">
        { isValidPost && (
          <FormPost post={post}
            category={category}
            categories={categories}
            handleAddPost={handleAddPost}
            handleEditPost={handleEditPost}
          />
        )}

        { !postLoaded && (
          <Loading />
        )}

        { !isValidPost && (
          <PageNotFound />
        )}
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
    postLoaded: FormHelper.isFormLoaded(postId, posts.loaded),
    categories: CategoryHelper.getAllCategories(categories),
    isValidPost: PostHelper.isValidPost(post, postId, posts.loaded)
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