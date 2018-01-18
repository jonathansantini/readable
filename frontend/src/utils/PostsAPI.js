const root = process.env.REACT_APP_BACKEND;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

function getAll () {
  return fetch(`${root}/posts`, { headers })
}

function getCategoryPosts (cat) {
  const path = cat === 'all'
      ? `${root}/posts`
      : `${root}/${cat}/posts`;
  return fetch(path, { headers })
    .then(res => res.json())
    .then(data => data)
}

function getPost (postId) {
  return fetch(`${root}/posts/${postId}`, { headers })
    .then(res => res.json())
}

module.exports = {
  getCategoryPosts,
  getPost,
  getAll
}