export function formatPost (posts) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    return posts.byId[id];
  }, {}) : {};
}

export function formatPosts (posts, sort) {
  return posts.allIds ? posts.allIds.reduce((p, id) => {
    const post = posts.byId[id];
    if (!post.deleted) {
      p.push(post);
      if (sort) {
      }
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