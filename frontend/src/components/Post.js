import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoteScore from '../components/VoteScore';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Post (props) {
  const { post, openDeletePostOverlay, handlePostVote } = props;

  return (
    <div className="post">
      <h3 className="post__hdr">{post.title}</h3>
      <div className="post__body">{post.body}</div>
      <div className="post__info">
        <span className="post__info--date">
          <label className="post__label">DATE</label>
          <span className="post__info--date--txt">{new Date(post.timestamp).toLocaleDateString()}</span>
        </span>
        <span className="post__info--author">
          <label className="post__label">AUTHOR</label>
          <span className="post__info--author--txt">{post.author}</span>
        </span>
      </div>
      <div className="post__controls">
        <Link
          to={`/${post.category}/${post.id}/edit`}
          className="post__controls--link">
          <RaisedButton label="Edit" primary={true} />
        </Link>
        <RaisedButton onClick={() => openDeletePostOverlay(post.id)} label="Delete" secondary={true} />
      </div>
      <div className="post__vote">
        <VoteScore id={post.id}
         handleVote={handlePostVote}
         score={post.voteScore}
        />
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  handlePostVote: PropTypes.func.isRequired,
  openDeletePostOverlay: PropTypes.func.isRequired
}

export default Post;