import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts, deletePost, handlePostVote } from '../actions/posts';
import Nav from '../components/Nav';
import Posts from '../components/Posts';
import PageNotFound from '../components/PageNotFound';
import AlertDialog from '../components/AlertDialog';
import Loading from '../components/Loading';
import * as PostsHelper from '../utils/helpers/posts';
import * as CategoryHelper from "../utils/helpers/categories";

/**
 * Controlled component used to display a list of posts from all of a single category.
 * @extends React
 */
class PostsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOverlay: {
        open: false,
        postId: '',
      },
    };

    this.openDeleteOverlay = this.openDeleteOverlay.bind(this);
    this.onDeleteOverlaySubmit = this.onDeleteOverlaySubmit.bind(this);
    this.onDeleteOverlayCancel = this.onDeleteOverlayCancel.bind(this);
  }

  componentDidMount() {
    const { category, fetchPosts } = this.props;
    fetchPosts(category);
  }

  componentWillReceiveProps(prevProps) {
    const { category, fetchPosts } = this.props;
    if (prevProps.category !== category) {
      fetchPosts(prevProps.category);
    }
  }

  openDeleteOverlay(data) {
    const { postId } = data;

    this.setState({
      deleteOverlay: {
        postId,
        open: true
      }
    })
  }

  onDeleteOverlaySubmit() {
    const { postId } = this.state.deleteOverlay;

    if (postId) {
      this.props.deletePost(postId);
    }

    this.setState({
      deleteOverlay: {
        postId: '',
        open: false
      }
    })
  }

  onDeleteOverlayCancel() {
    this.setState({
      deleteOverlay: {
        postId: '',
        commentId: '',
        open: false
      }
    })
  }

  render() {
    const { posts, category, categories=[], postsLoaded, handlePostVote, isValidCategory } = this.props;
    const { deleteOverlay } = this.state;

    return (
      <div className="posts">
        { postsLoaded && isValidCategory && (
          <div>
            <Nav category={category}
              categories={categories}
            />

            <Posts posts={posts}
              category={category}
              handlePostVote={handlePostVote}
              openDeleteOverlay={this.openDeleteOverlay}
            />

            <AlertDialog
              open={deleteOverlay.open}
              message='You sure you want to delete this post?'
              onCancel={this.onDeleteOverlayCancel}
              onRequestClose={this.onDeleteOverlaySubmit}
            />
          </div>
        )}

        {!postsLoaded && (
          <Loading />
        )}

        {!isValidCategory && postsLoaded && (
          <PageNotFound />
        )}
      </div>
    );
  }
}

function mapStateToProps( state, ownProps ) {
  const category = ownProps.match.params.category;
  const filter = ownProps.location.hash;
  const { posts, categories, deleteOverlay } = state;
  const postsArray = PostsHelper.formatPosts(posts);
  const isValidCategory = CategoryHelper.isValidCategory(category, categories);

  return {
    category,
    isValidCategory,
    deleteOverlay,
    posts: PostsHelper.filterPosts(postsArray, filter),
    postsLoaded: posts.loaded,
    categories: CategoryHelper.getAllCategories(categories),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: data => deletePost(data, dispatch),
    fetchPosts: data => fetchPosts(data, dispatch),
    handlePostVote: data => handlePostVote(data, dispatch)
  }
}

export default withRouter (
  connect(mapStateToProps, mapDispatchToProps)(PostsDisplay)
);
