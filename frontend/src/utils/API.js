import * as CategoriesAPI from './CategoriesAPI';
import * as PostsAPI from './PostsAPI';

export const getCategoriesAndPosts = () =>
    Promise.all([
        CategoriesAPI.fetchAll(),
        PostsAPI.fetchAll(),
    ]).then(responses => Promise.all(responses.map(res => res.json())))
      .then(res => {
      const [ categories, posts ] = res;

      return {
        categories: categories.categories,
        posts,
      }
    })