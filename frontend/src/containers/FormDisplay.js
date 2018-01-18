import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from '../actions/index';
import FormPost from '../components/FormPost';
import FormComment from '../components/FormComment';
import * as FormHelper from '../utils/helpers/forms';

class FormDisplay extends Component {
  componentDidMount() {
    const { } = this.props;
  }
  render() {
    const { isPost, isComment, isValid } = this.props;

    return (
      <div>
        {isValid && isPost && (
          <FormPost />
        )}

        {isValid && isComment && (
          <FormComment />
        )}
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const type = ownProps.match.params.type || 'post';

  return {
    isValid: FormHelper.isValidFormType(type),
    isPost: FormHelper.isPostForm(type),
    isComment: FormHelper.isCommentForm(type)
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDisplay);
