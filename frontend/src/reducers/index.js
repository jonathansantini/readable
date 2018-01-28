import { combineReducers } from 'redux';

import {
  FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
  ADD_POST,
  EDIT_POST,
  FETCH_POSTS,
  RECEIVE_POST,
  RECEIVE_POSTS,
  FETCH_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
} from "../actions";

function posts (state = { byId: {}, allIds: [] }, action) {
  const { posts, post, loaded } = action;

  switch(action.type) {
    case EDIT_POST:
    case ADD_POST:
    case FETCH_POSTS:
      return {
        ...state,
        loaded
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

function categories (state = { byId: {}, allIds: [] }, action) {
  const { categories, loaded } = action;

  switch(action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        loaded
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        loaded,
        byId: categories.reduce((categories, cat) => {
          categories[cat.path] = cat;
          return categories;
        }, {}),
        allIds: categories.map(cat => cat.path)
      }
    default:
      return state;
  }
}

function comments (state = { byId: {}, allIds: [] }, action) {
  const { comments, comment, loaded } = action;
  switch(action.type) {
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case FETCH_COMMENTS:
      return {
        ...state,
        loaded
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

export default combineReducers({
  posts,
  categories,
  comments
});