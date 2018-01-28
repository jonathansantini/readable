import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchPostById, fetchCommentById, handleAddPost, handleEditPost, handleAddComment, handleEditComment } from '../actions/index';
import FormPostDisplay from '../components/FormPostDisplay';
import FormComment from './FormCommentDisplay';
import * as CategoryHelper from '../utils/helpers/categories';
import * as FormHelper from '../utils/helpers/forms';
import * as PostHelper from '../utils/helpers/posts';
import * as CommentsHelper from '../utils/helpers/comments';

class FormDisplay extends Component {
  componentDidMount() {
    const { postId, commentId, fetchPostById, fetchCommentById } = this.props;
    if (postId) {
      fetchPostById(postId);
    }
    if (commentId) {
      fetchCommentById(commentId);
    }
  }

  render() {
    const { categories, post, comment,
            handleAddPost, handleEditPost, category,
            handleAddComment, handleEditComment } = this.props;

    return (
      <div className="form">
        <Route exact path="/create/post" component={FormPostDisplay} />
        <Route exact path="/create/comment" component={FormCommentDisplay} />
        <Route exact path="/:category/:post_id/edit" component={FormPostDisplay} />
        <Route exact path="/:category/:post_id/edit/:comment_id" component={FormCommentDisplay} />
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const { categories, posts, comments } = state;
  const type = ownProps.match.params.type;
  const category = ownProps.match.params.category || 'post';
  const postId = ownProps.match.params.post_id;
  const commentId = ownProps.match.params.comment_id;
  const post = PostHelper.formatPost(posts);
console.log(ownProps.match.params)
  return {
    postId,
    commentId,
    category,
    post,
    comment: CommentsHelper.formatComment(commentId, comments),
    categories: CategoryHelper.getAllCategories(categories),
    isValid: FormHelper.isValidFormType(type),
    hasPost: FormHelper.isPostForm(post),
    isPost: FormHelper.isPostForm(type),
    isComment: FormHelper.isCommentForm(type)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleAddPost: data => handleAddPost(data, dispatch, ownProps),
    handleAddComment: data => handleAddComment(data, dispatch, ownProps),
    handleEditPost: data => handleEditPost(data, dispatch, ownProps),
    handleEditComment: data => handleEditComment(data, dispatch, ownProps),
    fetchPostById: id => fetchPostById(id, dispatch),
    fetchCommentById: id => fetchCommentById(id, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDisplay);
