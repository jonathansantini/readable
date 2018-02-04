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
 * Action that handles fetching a comment by id.
 * Sets posts loaded to false then fetches posts from API.
 * @returns {object} promise that received posts
 */
export const fetchCommentById = (id, dispatch) => {
  dispatch(fetchingComments());
  return CommentsAPI.getComment(id)
    .then(data => dispatch(receiveComment(data)))
};

/**
 * Action that handles adding a comment to a post.
 * @returns {object} promise that received comment and redirects to post page
 */
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


/**
 * Action that handles editing a comment.
 * @returns {object} promise that received comment and redirects to post page
 */
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
 * Action that handles voting for a comment.
 * @returns {object} promise that sets the comment vote
 */
export const handleCommentVote = (data, dispatch) => {
  return CommentsAPI.setVote(data)
    .then(data => dispatch(setCommentVote(data)))
}

/**
 * Action to handle deleting a comment using comment id.
 * @returns {object} promise that deleted comment
 */
export const deleteComment = (id, dispatch) => {
  return CommentsAPI.deleteComment(id)
    .then(() => dispatch(deletedComment(id)))
};

/**
 * Action to fetch comments
 */
export const fetchingComments = () => ({
  type: FETCH_COMMENTS,
  loaded: false
});

/**
 * Action to receive comment
 */
export const receiveComment = data => ({
  type: RECEIVE_COMMENT,
  loaded: true,
  comment: data
});

/**
 * Action to receive comments
 */
export const receiveComments = data => ({
  type: RECEIVE_COMMENTS,
  loaded: true,
  comments: data
});

/**
 * Action to add a comment
 */
export const addingComment = () => ({
  type: ADD_COMMENT,
  loaded: false
});

/**
 * Action to edit a comment
 */
export const editingComment = () => ({
  type: EDIT_COMMENT,
  loaded: false
});

/**
 * Action to delete a comment
 */
export const deletedComment = id => ({
  type: DELETE_COMMENT,
  id
});

/**
 * Action to vote on a comment
 */
export const setCommentVote = data => ({
  type: VOTE_COMMENT,
  loaded: true,
  comment: data
});