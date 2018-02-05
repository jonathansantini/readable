import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostById, deletePost, handlePostVote } from '../actions/posts';
import { fetchComments, deleteComment, handleCommentVote } from '../actions/comments';
import Nav from '../components/Nav';
import Post from '../components/Post';
import Comments from '../components/Comments';
import AlertDialog from '../components/AlertDialog';
import PageNotFound from "../components/PageNotFound";
import Loading from '../components/Loading';
import * as PostsHelper from '../utils/helpers/posts';
import * as CommentsHelper from '../utils/helpers/comments';
import * as CategoryHelper from "../utils/helpers/categories";

/**
 * Controlled component used to display a post and it's comments.
 * @extends React
 */
class PostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOverlay: {
        open: false,
        postId: '',
        commentId: '',
        message: '',
      },
    };

    this.openDeleteOverlay = this.openDeleteOverlay.bind(this);
    this.onDeleteOverlaySubmit = this.onDeleteOverlaySubmit.bind(this);
    this.onDeleteOverlayCancel = this.onDeleteOverlayCancel.bind(this);
  }

  componentDidMount() {
    const { postId, fetchPostById, fetchComments } = this.props;
    if (postId) {
      fetchPostById(postId);
      fetchComments([postId]);
    }
  }

  componentWillReceiveProps(prevProps) {
    const { comments, fetchPostById } = this.props;
    if (prevProps.comments.length !== comments.length) {
      fetchPostById(prevProps.postId);
    }
  }

  openDeleteOverlay(data) {
    const { postId, commentId } = data;

    const message = postId ? 'You sure you want to delete this post?' :
                    commentId ? 'You sure you want to delete this comment?' : '';

    this.setState({
      deleteOverlay: {
        postId,
        commentId,
        message,
        open: true
      }
    })
  }

  onDeleteOverlaySubmit() {
    const { postId, commentId } = this.state.deleteOverlay;
    const { category } = this.props;

    if (postId) {
      this.props.deletePost({postId, category});
    }
    if (commentId) {
      this.props.deleteComment(commentId);
    }
    this.setState({
      deleteOverlay: {
        postId: '',
        commentId: '',
        message: '',
        open: false
      }
    })
  }

  onDeleteOverlayCancel() {
    this.setState({
      deleteOverlay: {
        postId: '',
        commentId: '',
        message: '',
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
      categories=[],
      handlePostVote,
      handleCommentVote,
      isValidPost,
      postLoaded,
      commentsLoaded
    } = this.props;

    const { deleteOverlay } = this.state;

    return (
      <div className="post-wrapper">
          {isValidPost && postLoaded && commentsLoaded && (
            <div>
              <Nav category={category}
                hideFilter={true}
                categories={categories}
              />
              <Post post={post}
                disableHeaderLink={true}
                hideEditBtn={true}
                handlePostVote={handlePostVote}
                openDeleteOverlay={this.openDeleteOverlay}
              />
              <Comments comments={comments}
                postId={postId}
                category={category}
                handleCommentVote={handleCommentVote}
                openDeleteOverlay={this.openDeleteOverlay}
              />
              <AlertDialog
                open={deleteOverlay.open}
                message={deleteOverlay.message}
                onCancel={this.onDeleteOverlayCancel}
                onRequestClose={this.onDeleteOverlaySubmit}
              />
          </div>
        )}

        {!postLoaded && (
          <Loading />
        )}

        {!isValidPost && (
          <PageNotFound />
        )}
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const { posts, comments, categories } = state;
  const postId = ownProps.match.params.post_id;
  const category = ownProps.match.params.category;
  const post = PostsHelper.formatPost(posts);

  return {
    category,
    post,
    postId,
    comments: CommentsHelper.formatComments(comments),
    commentsLoaded: comments.loaded,
    postLoaded: posts.loaded,
    categories: CategoryHelper.getAllCategories(categories),
    isValidPost: PostsHelper.isValidPost(post, postId, posts.loaded)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPostById: id => fetchPostById(id, dispatch),
    fetchComments: ids => fetchComments(ids, dispatch),
    deletePost: data => deletePost(data, dispatch, ownProps),
    deleteComment: id => deleteComment(id, dispatch),
    handlePostVote: data => handlePostVote(data, dispatch),
    handleCommentVote: data => handleCommentVote(data, dispatch)
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDisplay)
);
