import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  FETCH_POSTS,
  RECEIVE_POST,
  RECEIVE_POSTS,
} from "../actions/posts";

function posts (state = { byId: {}, allIds: [] }, action) {
  const { posts, post, loaded, id } = action;

  switch(action.type) {
    case EDIT_POST:
    case ADD_POST:
    case FETCH_POSTS:
      return {
        ...state,
        loaded
      }
    case DELETE_POST:
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
    case VOTE_POST:
      return {
        ...state,
        byId: {
          ...state['byId'],
          [post.id]: {
            ...state['byId'][post.id],
            voteScore: post.voteScore
          }
        },
      }
    case RECEIVE_POST:
      return {
        ...state,
        loaded,
        byId: {
          [post.id]: post
        },
        allIds: [post.id]
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        loaded,
        byId: posts.reduce((posts, post) => {
          posts[post.id] = post;
          return posts;
        }, {}),
        allIds: posts.map(post => post.id),
      }
    default:
      return state;
  }
}

export default posts;