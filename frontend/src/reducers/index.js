import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES_POSTS,
  ADD_POST
} from "../actions";

function posts (state = [], action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES_POSTS:
      const { posts } = action;
      return [
        ...posts,
      ]
    case ADD_POST:
      const { id, title, body, author, category, voteScore, deleted } = action;
      return {
        ...state,
        [posts]: {
          [id]: {
            id,
            timestamp: Date.now(),
            title,
            body,
            author,
            category,
            voteScore,
            deleted,
          }
        }
      }
    default:
      return state;
  }
}

function categories (state = [], action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES_POSTS:
      const { categories } = action;
      return [
        ...categories
      ]
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories,
});