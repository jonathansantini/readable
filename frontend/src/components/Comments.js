import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../components/Comment';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Comments (props) {
  const { comments } = props;

  return (
    <div className="comments">
      <h3 className="comments__hdr">Comments</h3>
      <ul className="comments__list">
        { comments.length ? comments.map((comment) => (
          <li className="comments__list--item" key={comment.id} >
            <Comment comment={comment} />
          </li>
        )) : (
          <li className="comments__list--item no-comments">
            Be the first to enter a comment.
          </li>
        )}
      </ul>
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default Comments;