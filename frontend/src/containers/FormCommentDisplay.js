import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCommentById, handleAddComment, handleEditComment } from "../actions/comments";
import FormComment from "../components/FormComment";
import PageNotFound from "../components/PageNotFound";
import * as CommentsHelper from "../utils/helpers/comments";
import * as CategoryHelper from "../utils/helpers/categories";

/**
 * Functional component used to display the post form.
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
    const { comment, category, handleAddComment, handleEditComment, isValidComment } = this.props;

    return (
      <div className="form-comment">
        { isValidComment && (
          <FormComment comment={comment}
            category={category}
            handleAddComment={handleAddComment}
            handleEditComment={handleEditComment}
          />
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
    isValidComment: CommentsHelper.isValidComment(comment, comments.loaded),
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