import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoteScore from '../components/VoteScore';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Post (props) {
  const { post, deletePost, handlePostVote } = props;

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
          to={`/${post.category}/${post.id}/edit`}
          className="post__controls--link">
          Edit
        </Link>
        <button className="post__controls--delete" onClick={() => deletePost(post.id)}>Delete</button>
        <VoteScore id={post.id} handleVote={handlePostVote} />
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  handlePostVote: PropTypes.func.isRequired
}

export default Post;