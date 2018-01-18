import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchComments } from '../actions/index';
import Post from '../components/Post';
import Comments from '../components/Comments';
import * as PostsHelper from '../utils/helpers/posts';
import * as CommentsHelper from '../utils/helpers/comments';

class PostDisplay extends Component {
  componentDidMount() {
    const { postId, fetchPost, fetchComments } = this.props;
    fetchPost(postId);
    fetchComments([postId]);
  }
  render() {
    const { post, comments } = this.props;

    return (
      <div>
        <Post post={post} />
        <Comments comments={comments} />
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const postId = ownProps.match.params.post_id;
  const category = ownProps.match.params.category;
  const { posts, comments } = state;

  return {
    category,
    postId,
    comments: CommentsHelper.formatComments(comments),
    post: PostsHelper.formatPost(posts)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: id => fetchPost(id, dispatch),
    fetchComments: ids => fetchComments(ids, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);
