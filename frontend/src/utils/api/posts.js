const API = require('../helpers/api');

function getAll () {
  return fetch(`${API.root}/posts`, API.headers)
}

function getCategoryPosts (cat) {
  const path = cat
      ? `${API.root}/${cat}/posts`
      : `${API.root}/posts`;
  return fetch(path, {
    'method': 'GET',
    headers: API.headers
  }).then(res => res.json())
    .then(data => data)
}

function getPost (postId) {
  return fetch(`${API.root}/posts/${postId}`, {
    'method': 'GET',
    headers: API.headers
  }).then(res => res.json())
}

function addPost (data) {
  return fetch(`${API.root}/posts`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers: API.headers
  }).then(res => res.json())
}

function editPost (data) {
  return fetch(`${API.root}/posts/${data.id}`, {
    'method': 'PUT',
    'body': JSON.stringify(data),
    headers: API.headers
  }).then(res => res.json())
}

function deletePost (id) {
  return fetch(`${API.root}/posts/${id}`, {
    'method': 'DELETE',
    headers: API.headers
  })
}

function setVote (data) {
  return fetch(`${API.root}/posts/${data.id}`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers: API.headers
  }).then(res => res.json())
}

module.exports = {
  getCategoryPosts,
  getPost,
  getAll,
  addPost,
  editPost,
  deletePost,
  setVote
}