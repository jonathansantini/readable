export function isValidPost (post, postId, loaded) {
  const hasKeys = Object.keys(post).length > 1;
  return loaded && !hasKeys && postId ? false : true;
}

export function formatPost (posts) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    const post = posts.byId[id];
    return post && !post.deleted ? post : {};
  }, {}) : {};
}

export function formatPosts (posts, sort) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    const post = posts.byId[id];
    if (!post.deleted && !post.error) {
      p.push(post);
    }
    return p;
  }, []) : [];
}

export function filterPosts (postsArray=[], type) {
  switch(type) {
    case '#day-asc':
      postsArray.sort((a, b) => a.timestamp - b.timestamp);
      break;
    case '#day-desc':
      postsArray.sort((a, b) => b.timestamp - a.timestamp);
      break;
    case '#score-asc':
      postsArray.sort((a, b) => a.voteScore - b.voteScore);
      break;
    case '#score-desc':
      postsArray.sort((a, b) => b.voteScore - a.voteScore);
      break;
    default:
      return postsArray;
  }
  return postsArray;
}