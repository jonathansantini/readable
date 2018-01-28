const root = process.env.REACT_APP_BACKEND;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Authorization': token,
};

function fetchAll () {
  return fetch(`${root}/categories`, {
    'method': 'GET',
    headers
  })
}

function all () {
  return this.fetchAll()
    .then(res => res.json())
    .then(data => data.categories)
}

module.exports = {
  fetchAll,
  all,
}