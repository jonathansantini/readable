import * as Helpers from "../utils/helpers/forms";
import * as CommentsAPI from "../utils/api/comments";

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

/**
 * Action to fetch comments.
 * Sets posts loaded to false then fetches posts from API.
 * @returns {object} promise that received posts
 */
export const fetchComments = (ids, dispatch) => {
  dispatch(fetchingComments());
  return CommentsAPI.get(ids)
    .then(data => dispatch(receiveComments(data)));
};

/**
 * Action to fetch comment by id.
 * Sets posts loaded to false then fetches posts from API.
 * @returns {object} promise that received posts
 */
export const fetchCommentById = (id, dispatch) => {
  dispatch(fetchingComments());
  return CommentsAPI.getComment(id)
    .then(data => dispatch(receiveComment(data)))
};

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

export const handleCommentVote = (data, dispatch) => {
  return CommentsAPI.setVote(data)
    .then(data => dispatch(setCommentVote(data)))
}

/**
 * Action to fetch a post by id.
 * Sets post loaded to false then fetches post from API.
 * @returns {object} promise that received post
 */
export const deleteComment = (id, dispatch) => {
  return CommentsAPI.deleteComment(id)
    .then(() => dispatch(deletedComment(id)))
};

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

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const deletedComment = id => ({
  type: DELETE_COMMENT,
  id
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const setCommentVote = data => ({
  type: VOTE_COMMENT,
  loaded: true,
  comment: data
});