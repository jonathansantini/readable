import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES_POSTS,
  SET_CATEGORY_NAME,
} from "../actions";

function posts (state = [], action) {
  const { posts } = action;

  switch(action.type) {
    case RECEIVE_CATEGORIES_POSTS:
      return [
        ...posts,
      ]
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

function category (state = {}, action) {
  switch(action.type) {
    case SET_CATEGORY_NAME:
      const { category } = action;
      return {
        name: category
      }
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories,
  category
});