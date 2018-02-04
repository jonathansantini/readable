import * as CategoriesAPI from '../utils/api/categories';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

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
 * Action to receive categories
 * @returns {object} action type with categories
 */
export const fetchingCategories = () => ({
  type: FETCH_CATEGORIES,
  loaded: false
});

/**
 * Action to receive categories
 * @returns {object} action type with categories
 */
export const receiveCategories = data => ({
  type: RECEIVE_CATEGORIES,
  categories: data,
  loaded: true
});