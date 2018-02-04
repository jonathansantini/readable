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
  const { post, hideEditBtn, openDeleteOverlay, handlePostVote } = props;

  return (
    <div className="post">
      <h3 className="post__hdr">
        <Link
          className="post__hdr--link"
          to={`/${post.category}/${post.id}`} >
          {post.title}
        </Link>
      </h3>
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
        <span className="post__info--comments">
          <label className="post__label">Comments</label>
          <span className="post__info--author--txt">{post.commentCount}</span>
        </span>
      </div>
      <div className="post__controls">
        { !hideEditBtn && (
          <Link
            to={`/${post.category}/${post.id}`}
            className="post__controls--link">
            <RaisedButton label="View" primary={true} />
          </Link>
        )}
        <Link
          to={`/${post.category}/${post.id}/edit`}
          className="post__controls--link">
          <RaisedButton label="Edit" primary={true} />
        </Link>
        <RaisedButton onClick={() => openDeleteOverlay({postId: post.id})} label="Delete" secondary={true} />
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
  openDeleteOverlay: PropTypes.func.isRequired
}

export default Post;