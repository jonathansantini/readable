const API = require('../helpers/api');

function getComment (commentId) {
  return fetch(`${API.root}/comments/${commentId}`, {
    'method': 'GET',
    headers: API.headers
  }).then(res => res.json())
}

function get (ids = []) {
  const promises = [];
  ids.forEach((id) =>
    promises.push(fetch(`${API.root}/posts/${id}/comments`, {
      'method': 'GET',
      headers: API.headers
    })));
  return Promise.all(promises)
    .then(responses =>
      Promise.all(responses.map(res => res.json()))
    )
    .then(data =>
      data.filter(comments => comments.length ? comments : null)
    ).then(data => {
      let comments = {};
      data.forEach(comment => comments[comment[0].parentId] = comment);
      return comments;
    })
}

function addComment (data) {
  return fetch(`${API.root}/comments`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers: API.headers
  }).then(res => res.json())
}

function editComment (data) {
  return fetch(`${API.root}/comments/${data.id}`, {
    'method': 'PUT',
    'body': JSON.stringify(data),
    headers: API.headers
  }).then(res => res.json())
}

function deleteComment (id) {
  return fetch(`${API.root}/comments/${id}`, {
    'method': 'DELETE',
    headers: API.headers
  })
}

function setVote (data) {
  return fetch(`${API.root}/comments/${data.id}`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers: API.headers
  }).then(res => res.json())
}

module.exports = {
  get,
  getComment,
  addComment,
  editComment,
  deleteComment,
  setVote
}