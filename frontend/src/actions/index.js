import * as API from "../utils/API";

export const RECEIVE_CATEGORIES_POSTS = 'RECEIVE_CATEGORIES_POSTS';
export const ADD_POST = 'ADD_POST';

/**
 * Used to fetch both categories and posts
 * Calls API to set up Promise and then uses dispatch on return
 * to call receiveCategoriesPosts.
 * @returns {object} posts and categories
 */
export const fetchCategoriesPosts = () => dispatch => (
  API
    .getCategoriesAndPosts()
    .then(data => dispatch(receiveCategoriesPosts(data)))
);

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export function receiveCategoriesPosts (data) {
  return {
    type: RECEIVE_CATEGORIES_POSTS,
    posts: data.posts,
    categories: data.categories
  }
};

/**
 * Action to add new post
 * @returns {object} action type with post attributes
 */
export function addPost ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
  }
}