const root = process.env.REACT_APP_BACKEND;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

let headers = {
  'Content-Type': 'application/json',
  'Authorization': token,
};

function getAll () {
  return fetch(`${root}/posts`, headers)
}

function getCategoryPosts (cat) {
  const path = cat === 'all'
      ? `${root}/posts`
      : `${root}/${cat}/posts`;
  return fetch(path, {
    'method': 'GET',
    headers
  }).then(res => res.json())
    .then(data => data)
}

function getPost (postId) {
  return fetch(`${root}/posts/${postId}`, {
    'method': 'GET',
    headers
  }).then(res => res.json())
}

function addPost (data) {
  return fetch(`${root}/posts`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers
  }).then(res => res.json())
}

function editPost (data) {
  return fetch(`${root}/posts/${data.id}`, {
    'method': 'PUT',
    'body': JSON.stringify(data),
    headers
  }).then(res => res.json())
}

function deletePost (id) {
  return fetch(`${root}/posts/${id}`, {
    'method': 'DELETE',
    headers
  })
}

module.exports = {
  getCategoryPosts,
  getPost,
  getAll,
  addPost,
  editPost,
  deletePost
}