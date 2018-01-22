const root = process.env.REACT_APP_BACKEND;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

function getComment (commentId) {
  return fetch(`${root}/comments/${commentId}`, { headers })
    .then(res => res.json())
}

function get (ids = []) {
  const promises = [];
  ids.forEach((id) =>
    promises.push(fetch(`${root}/posts/${id}/comments`, { headers })));
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

module.exports = {
  get,
  getComment
}