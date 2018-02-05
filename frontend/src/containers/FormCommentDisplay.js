import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCommentById, handleAddComment, handleEditComment } from "../actions/comments";
import FormComment from "../components/FormComment";
import PageNotFound from "../components/PageNotFound";
import Loading from '../components/Loading';
import * as CommentsHelper from "../utils/helpers/comments";
import * as CategoryHelper from "../utils/helpers/categories";
import * as FormHelper from "../utils/helpers/forms";

/**
 * Controlled component used to display the comment form.
 * Loads comment data if :comment_id is provided from React Router.
 * @extends React
 */
class FormCommentDisplay extends Component {
  componentDidMount() {
    const { commentId, fetchCommentById } = this.props;
    if (commentId) {
      fetchCommentById(commentId);
    }
  }

  render() {
    const { comment, category, handleAddComment, handleEditComment, isValidComment, formLoaded } = this.props;

    return (
      <div className="form-comment">
        { isValidComment && (
          <FormComment comment={comment}
            category={category}
            handleAddComment={handleAddComment}
            handleEditComment={handleEditComment}
          />
        )}

        { !formLoaded && (
          <Loading />
        )}

        { !isValidComment && (
          <PageNotFound />
        )}
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  const { categories, comments } = state;

  const category = ownProps.match.params.category;
  const commentId = ownProps.match.params.comment_id;
  const comment = CommentsHelper.formatComment(commentId, comments);

  return {
    category,
    commentId,
    comment,
    formLoaded: FormHelper.isFormLoaded(commentId, comments.loaded),
    isValidComment: CommentsHelper.isValidComment(comment, commentId, comments.loaded),
    categories: CategoryHelper.getAllCategories(categories),
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleAddComment: data => handleAddComment(data, dispatch, ownProps),
    handleEditComment: data => handleEditComment(data, dispatch, ownProps),
    fetchCommentById: id => fetchCommentById(id, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCommentDisplay);