const API = require('../helpers/api');

function fetchAll () {
  return fetch(`${API.root}/categories`, {
    'method': 'GET',
    headers: API.headers
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
