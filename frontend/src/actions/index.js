import * as PostsAPI from '../utils/PostsAPI';
import * as CommentsAPI from '../utils/CommentsAPI';
import * as CategoriesAPI from '../utils/CategoriesAPI';
import * as Helpers from '../utils/helpers/forms';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
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
    .then(data => dispatch(receivePost(data)))
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
    .then(data => dispatch(receiveComment(data)))
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
  }
  dispatch(addingPost())
  return PostsAPI.addPost(post)
    .then(data => dispatch(receivePost(data)))
    .then(ownProps.history.push(`/${category}`))
}

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

export const handleAddComment = (data, dispatch, ownProps) => {
  const { body, author } = data;
  const category = ownProps.match.params.category;
  const parentId = ownProps.match.params.post_id;

  const comment = {
    id: Helpers.generateRandomPostId(),
    timestamp: new Date().valueOf(),
    body,
    author,
    parentId,
  }
  dispatch(addingComment())
  return CommentsAPI.addComment(comment)
    .then(data => dispatch(receiveComment(data)))
    .then(ownProps.history.push(`/${category}/${parentId}`))
}

export const handleEditComment = (data, dispatch, ownProps) => {
  const { id, body, author, parentId } = data;
  const category = ownProps.match.params.category;

  const comment = {
    timestamp: new Date().valueOf(),
    id,
    body,
    author
  }
  dispatch(editingComment())
  return CommentsAPI.editComment(comment)
    .then(data => dispatch(receiveComment(data)))
    .then(ownProps.history.push(`/${category}/${parentId}`))
}

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const fetchingCategories = () => ({
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
export const fetchingComments = () => ({
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
export const addingComment = () => ({
  type: ADD_COMMENT,
  loaded: false
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const editingComment = () => ({
  type: EDIT_COMMENT,
  loaded: false
});
