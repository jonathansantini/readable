import {
  FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
} from "../actions/categories";

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

export default categories;