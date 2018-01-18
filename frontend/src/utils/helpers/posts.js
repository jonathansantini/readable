export function formatPost (posts) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    return posts.byId[id];
  }, {}) : {};
}

export function formatPosts (posts) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    p.push(posts.byId[id]);
    return p;
  }, []) : [];
}