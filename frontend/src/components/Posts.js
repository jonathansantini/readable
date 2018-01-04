import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Posts (props) {
  const { posts } = props;

  return (
    <div className="posts">
      <h3 className="posts__hdr">Posts</h3>
      <div className="posts__list">
        <ul className="posts__list--list">
          {posts.map((post) => (
            <li key={post.title} className="posts__list--item">
              <Link
                to={`/posts/${post.id}`}
                className="posts__list--link">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts;