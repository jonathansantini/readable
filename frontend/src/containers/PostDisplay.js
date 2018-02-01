import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostById, deletePost, handlePostVote } from '../actions/posts';
import { fetchComments, deleteComment, handleCommentVote } from '../actions/comments';
import Nav from '../components/Nav';
import Post from '../components/Post';
import Comments from '../components/Comments';
import * as PostsHelper from '../utils/helpers/posts';
import * as CommentsHelper from '../utils/helpers/comments';
import * as CategoryHelper from "../utils/helpers/categories";

class PostDisplay extends Component {
  componentDidMount() {
    const { postId, fetchPostById, fetchComments } = this.props;
    fetchPostById(postId);
    fetchComments([postId]);
  }
  render() {
    const {
      post,
      postId,
      comments,
      category,
      categories,
      deletePost,
      deleteComment,
      handlePostVote,
      handleCommentVote,
      postLoaded,
      commentsLoaded
    } = this.props;

    return (
      <div className="post-wrapper">
        <Nav category={category}
           categories={categories}
        />
        {postLoaded && (
          <Post post={post}
            deletePost={deletePost}
            handlePostVote={handlePostVote}
          />
        )}
        {commentsLoaded && (
          <Comments comments={comments}
            deleteComment={deleteComment}
            postId={postId}
            category={category}
            handleCommentVote={handleCommentVote}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const postId = ownProps.match.params.post_id;
  const category = ownProps.match.params.category;
  const { posts, comments, categories } = state;

  return {
    category,
    postId,
    comments: CommentsHelper.formatComments(comments),
    commentsLoaded: comments.loaded,
    post: PostsHelper.formatPost(posts),
    postLoaded: posts.loaded,
    categories: CategoryHelper.getAllCategories(categories)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostById: id => fetchPostById(id, dispatch),
    fetchComments: ids => fetchComments(ids, dispatch),
    deletePost: data => deletePost(data, dispatch),
    deleteComment: id => deleteComment(id, dispatch),
    handlePostVote: data => handlePostVote(data, dispatch),
    handleCommentVote: data => handleCommentVote(data, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay);
