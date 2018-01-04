import * as API from "../utils/API";

export const RECEIVE_CATEGORIES_POSTS = 'RECEIVE_CATEGORIES_POSTS';
export const SET_CATEGORY_NAME = 'SET_CATEGORY_NAME';

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const setCategory = category => dispatch => {
  dispatch(setCategoryName(category))
  return dispatch(fetchCategoriesPosts(category))
};

/**
 * Used to fetch both categories and posts
 * Calls API to set up Promise and then uses dispatch on return
 * to call receiveCategoriesPosts.
 * @returns {object} posts and categories
 */
const fetchCategoriesPosts = path => dispatch => (
  API
    .getCategoriesAndPosts(path)
    .then(data => dispatch(receiveCategoriesPosts(data)))
);

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const receiveCategoriesPosts = data => ({
  type: RECEIVE_CATEGORIES_POSTS,
  posts: data.posts,
  categories: data.categories
});

/**
 * Action to receive posts and categories
 * @returns {object} action type with posts and categories
 */
export const setCategoryName = data => ({
    type: SET_CATEGORY_NAME,
    category: data
});