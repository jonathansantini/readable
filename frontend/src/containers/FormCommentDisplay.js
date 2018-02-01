import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCommentById, handleAddComment, handleEditComment } from "../actions/comments";
import Nav from '../components/Nav';
import FormComment from "../components/FormComment";
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
    const { comment={}, category, categories, handleAddComment, handleEditComment } = this.props;

    return (
      <div className="form-comment">
        <Nav category={category}
          categories={categories}
        />
        <FormComment comment={comment}
          category={category}
          handleAddComment={handleAddComment}
          handleEditComment={handleEditComment}
        />
      </div>
    )
  }
}

function mapStateToProps( state, ownProps ) {
  const { categories, comments } = state;
  const category = ownProps.match.params.category || 'post';
  const commentId = ownProps.match.params.comment_id;

  return {
    category,
    commentId,
    comment: CommentsHelper.formatComment(commentId, comments),
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