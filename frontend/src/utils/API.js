import * as CategoriesAPI from './CategoriesAPI';
import * as PostsAPI from './PostsAPI';

export const getCategoriesAndPosts = path => {
  let promises = [
    CategoriesAPI.fetchAll(),
    PostsAPI.getAll(),
  ];
  return Promise.all(promises).then(
    responses => Promise.all(responses.map(res => res.json()))
  )
  .then(res => {
    const [categories, posts] = res;
    return {
      categories: categories.categories,
      posts,
    }
  })
}