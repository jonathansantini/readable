import * as PostsAPI from '../utils/api/posts';
import * as Helpers from '../utils/helpers/forms';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/**
 * Action to fetch posts of a category.
 * Sets posts loaded to false then fetches posts from API.
 * @returns {object} promise that received posts
 */
export const fetchPosts = (category, dispatch) => {
  dispatch(fetchingPosts())
  return PostsAPI.getCategoryPosts(category)
    .then(data => dispatch(receivePosts(data)))
};

/**
 * Action to fetch a post by id.
 * Sets post loaded to false then fetches post from API.
 * @returns {object} promise that received post
 */
export const fetchPostById = (id, dispatch) => {
  dispatch(fetchingPost())
  return PostsAPI.getPost(id)
    .then(data => dispatch(receivePost(data)))
};

/**
 * Action to fetch a post by id.
 * Sets post loaded to false then fetches post from API.
 * @returns {object} promise that received post
 */
export const deletePost = (id, dispatch) => {
  return PostsAPI.deletePost(id)
    .then(() => dispatch(deletedPost(id)))
};

export const handleAddPost = (data, dispatch, ownProps) => {
  const { title, body, author, category } = data;

  const post = {
    id: Helpers.generateRandomPostId(),
    timestamp: new Date().valueOf(),
    title,
    body,
    author,
    category,
  };
  dispatch(addingPost())
  return PostsAPI.addPost(post)
    .then(data => dispatch(receivePost(data)))
    .then(ownProps.history.push(`/${category}`))
};

export const handleEditPost = (data, dispatch, ownProps) => {
  const { title, body, category, id } = data;
  const post = {
    id,
    title,
    body,
  }
  dispatch(editingPost())
  return PostsAPI.editPost(post)
    .then(data => dispatch(receivePost(data)))
    .then(ownProps.history.push(`/${category}`))
}

export const handlePostVote = (data, dispatch) => {
  return PostsAPI.setVote(data)
    .then(data => dispatch(setPostVote(data)))
}

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const fetchingPosts = () => ({
  type: FETCH_POSTS,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receivePosts = data => ({
  type: RECEIVE_POSTS,
  posts: data,
  loaded: true
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const fetchingPost = () => ({
  type: FETCH_POSTS,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receivePost = data => ({
  type: RECEIVE_POST,
  post: data,
  loaded: true
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const deletedPost = id => ({
  type: DELETE_POST,
  id
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const addingPost = () => ({
  type: ADD_POST,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const editingPost = () => ({
  type: EDIT_POST,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const setPostVote = data => ({
  type: VOTE_POST,
  loaded: true,
  post: data
});