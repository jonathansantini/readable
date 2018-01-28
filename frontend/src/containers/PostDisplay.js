import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostById, fetchComments } from '../actions/index';
import Post from '../components/Post';
import Comments from '../components/Comments';
import * as PostsHelper from '../utils/helpers/posts';
import * as CommentsHelper from '../utils/helpers/comments';

class PostDisplay extends Component {
  componentDidMount() {
    const { postId, fetchPostById, fetchComments } = this.props;
    fetchPostById(postId);
    fetchComments([postId]);
  }
  render() {
    const { post, postId, comments, category } = this.props;

    return (
      <div>
        <Post post={post} />
        <Comments comments={comments}
          postId={postId}
          category={category}
        />
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
    fetchPostById: id => fetchPostById(id, dispatch),
    fetchComments: ids => fetchComments(ids, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);
