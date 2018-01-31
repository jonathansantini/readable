export function formatPost (posts) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    return posts.byId[id];
  }, {}) : {};
}

export function formatPosts (posts) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    const post = posts.byId[id];
    if (!post.deleted) {
      p.push(post);
    }
    return p;
  }, []) : [];
}