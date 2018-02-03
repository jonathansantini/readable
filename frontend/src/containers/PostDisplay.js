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
import AlertDialog from '../components/AlertDialog';

class PostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePostOverlay: {
        id: '',
        open: false
      },
      deleteCommentOverlay: {
        id: '',
        open: false
      }
    };

    this.openDeletePostOverlay = this.openDeletePostOverlay.bind(this);
    this.onDeletePostSubmit = this.onDeletePostSubmit.bind(this);
    this.onDeletePostCancel = this.onDeletePostCancel.bind(this);

    this.openDeleteCommentOverlay = this.openDeleteCommentOverlay.bind(this);
    this.onDeleteCommentSubmit = this.onDeleteCommentSubmit.bind(this);
    this.onDeleteCommentCancel = this.onDeleteCommentCancel.bind(this);
  }

  componentDidMount() {
    const { postId, fetchPostById, fetchComments } = this.props;
    fetchPostById(postId);
    fetchComments([postId]);
  }

  openDeletePostOverlay(id) {
    this.setState({
      deletePostOverlay: {
        id,
        open: true
      }
    })
  }

  onDeletePostSubmit() {
    this.props.deletePost(this.state.deletePostOverlay.id);
    this.setState({
      deletePostOverlay: {
        id: '',
        open: false
      }
    })
  }

  onDeletePostCancel() {
    this.setState({
      deletePostOverlay: {
        id: '',
        open: false
      }
    })
  }

  openDeleteCommentOverlay(id) {
    this.setState({
      deleteCommentOverlay: {
        id,
        open: true
      }
    })
  }

  onDeleteCommentSubmit() {
    this.props.deleteComment(this.state.deleteCommentOverlay.id);
    this.setState({
      deleteCommentOverlay: {
        id: '',
        open: false
      }
    })
  }

  onDeleteCommentCancel() {
    this.setState({
      deleteCommentOverlay: {
        id: '',
        open: false
      }
    })
  }

  render() {
    const {
      post,
      postId,
      comments,
      category,
      categories,
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
            handlePostVote={handlePostVote}
            openDeletePostOverlay={this.openDeletePostOverlay}
          />
        )}
        {commentsLoaded && (
          <Comments comments={comments}
            postId={postId}
            category={category}
            handleCommentVote={handleCommentVote}
            openDeleteCommentOverlay={this.openDeleteCommentOverlay}
          />
        )}

        <AlertDialog
          open={this.state.deletePostOverlay.open}
          message='You sure you want to delete this post?'
          onCancel={this.onDeletePostCancel}
          onRequestClose={this.onDeletePostSubmit}
        />

        <AlertDialog
          open={this.state.deleteCommentOverlay.open}
          message='You sure you want to delete this comment?'
          onCancel={this.onDeleteCommentCancel}
          onRequestClose={this.onDeleteCommentSubmit}
        />
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
