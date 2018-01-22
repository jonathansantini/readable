import * as PostsAPI from '../utils/PostsAPI';
import * as CommentsAPI from '../utils/CommentsAPI';
import * as CategoriesAPI from '../utils/CategoriesAPI';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

/**
 * Action to fetch categories.
 * Sets loaded to false then fetches categories from API.
 * @returns {object} promise that received categories
 */
export const fetchCategories = (data, dispatch) => {
  dispatch(fetchingCategories())
  return CategoriesAPI.all()
    .then(data => dispatch(receiveCategories(data)))
};

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
    .then(data => dispatch(receivePost([data])))
};

/**
 * Action to fetch comments.
 * Sets posts loaded to false then fetches posts from API.
 * @returns {object} promise that received posts
 */
export const fetchComments = (ids, dispatch) => {
  dispatch(fetchingComments())
  return CommentsAPI.get(ids)
    .then(data => {
      dispatch(receiveComments(data))
    })
};

/**
 * Action to fetch comment by id.
 * Sets posts loaded to false then fetches posts from API.
 * @returns {object} promise that received posts
 */
export const fetchCommentById = (id, dispatch) => {
  dispatch(fetchingComments())
  return CommentsAPI.getComment(id)
    .then(data => {
      dispatch(receiveComment(data))
    })
};

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const fetchingCategories = data => ({
  type: FETCH_CATEGORIES,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receiveCategories = data => ({
  type: RECEIVE_CATEGORIES,
  categories: data,
  loaded: true
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const fetchingPosts = data => ({
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
export const fetchingPost = data => ({
  type: FETCH_POSTS,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receivePost = data => ({
  type: RECEIVE_POSTS,
  posts: data,
  loaded: true
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const fetchingComments = data => ({
  type: FETCH_COMMENTS,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receiveComment = data => ({
  type: RECEIVE_COMMENT,
  loaded: true,
  comment: data
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receiveComments = data => ({
  type: RECEIVE_COMMENTS,
  loaded: true,
  comments: data
});