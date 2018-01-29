const root = process.env.REACT_APP_BACKEND;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Authorization': token,
};

function getComment (commentId) {
  return fetch(`${root}/comments/${commentId}`, {
    'method': 'GET',
    headers
  }).then(res => res.json())
}

function get (ids = []) {
  const promises = [];
  ids.forEach((id) =>
    promises.push(fetch(`${root}/posts/${id}/comments`, {
      'method': 'GET',
      headers
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
  return fetch(`${root}/comments`, {
    'method': 'POST',
    'body': JSON.stringify(data),
    headers
  }).then(res => res.json())
}

function editComment (data) {
  return fetch(`${root}/comments/${data.id}`, {
    'method': 'PUT',
    'body': JSON.stringify(data),
    headers
  }).then(res => res.json())
}

function deleteComment (id) {
  return fetch(`${root}/comments/${id}`, {
    'method': 'DELETE',
    headers
  })
}

module.exports = {
  get,
  getComment,
  addComment,
  editComment,
  deleteComment
}