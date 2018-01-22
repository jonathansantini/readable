import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostById, fetchCommentById } from '../actions/index';
import FormPost from '../components/FormPost';
import FormComment from '../components/FormComment';
import * as CategoryHelper from '../utils/helpers/categories';
import * as FormHelper from '../utils/helpers/forms';
import * as PostHelper from '../utils/helpers/posts';
import * as CommentsHelper from '../utils/helpers/comments';

class FormDisplay extends Component {
  componentDidMount() {
    const { id, isPost, fetchPostById, isComment, fetchCommentById } = this.props;
    if (isPost) {
      fetchPostById(id);
    }
    if (isComment) {
      fetchCommentById(id);
    }
  }
  render() {
    const { categories, post, comment, isPost, isComment, isValid } = this.props;

    return (
      <div className="form">
        {isValid && isPost && (
          <FormPost post={post}
            categories={categories} />
        )}

        {isValid && isComment && (
          <FormComment comment={comment}
            categories={categories} />
        )}
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const type = ownProps.match.params.type || 'post';
  const id = ownProps.match.params.id;
  const { categories, posts, comments } = state;

  return {
    id,
    post: PostHelper.formatPost(posts),
    comment: CommentsHelper.formatComment(id, comments),
    categories: CategoryHelper.getAllCategories(categories),
    isValid: FormHelper.isValidFormType(type),
    isPost: FormHelper.isPostForm(type),
    isComment: FormHelper.isCommentForm(type)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostById: id => fetchPostById(id, dispatch),
    fetchCommentById: id => fetchCommentById(id, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDisplay);
