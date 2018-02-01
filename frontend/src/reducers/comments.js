import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RECEIVE_COMMENT,
  VOTE_COMMENT,
  RECEIVE_COMMENTS,
} from "../actions/comments";

function comments (state = { byId: {}, allIds: [] }, action) {
  const { comments, comment, loaded, id } = action;

  switch(action.type) {
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case FETCH_COMMENTS:
      return {
        ...state,
        loaded
      }
    case DELETE_COMMENT:
      return {
        ...state,
        byId: {
          ...state['byId'],
          [id]: {
            ...state['byId'][id],
            deleted: true
          }
        },
      }
    case VOTE_COMMENT:
      return {
        ...state,
        byId: {
          ...state['byId'],
          [comment.id]: {
            ...state['byId'][comment.id],
            voteScore: comment.voteScore
          }
        },
      }
    case RECEIVE_COMMENTS:
      return  {
        ...state,
        loaded,
        byId: Object.keys(comments).reduce((c, id) => {
          comments[id].map((comment) => c[comment.id] = comment);
          return c;
        }, {}),
        allIds: Object.keys(comments).reduce((c, id) => {
          comments[id].map((comment) => c.push(comment.id));
          return c;
        }, [])
      }
    case RECEIVE_COMMENT:
      return  {
        ...state,
        loaded,
        byId: {
          [comment.id]: comment
        },
        allIds: [comment.id]
      }
    default:
      return state;
  }
}

export default comments;