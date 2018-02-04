const root = process.env.REACT_APP_BACKEND;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

let headers = {
  'Content-Type': 'application/json',
  'Authorization': token,
};

module.exports = {
  root,
  token,
  headers
}