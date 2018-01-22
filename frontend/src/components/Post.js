import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Post (props) {
  const { post } = props;

  return (
    <div className="post">
      <h3 className="post__hdr">{post.title}</h3>
      <div className="post__body">{post.body}</div>
      <div className="post__info">
        <span className="post__info--author">{post.author}</span>
        <span className="post__info--score">{post.voteScore}</span>
        <span className="post__hdr--author">{new Date(post.timestamp).toLocaleDateString()}</span>
      </div>
      <div className="post__controls">
        <Link
          to={`/edit/post/${post.id}`}
          className="post__controls--link">
          Edit
        </Link>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post;