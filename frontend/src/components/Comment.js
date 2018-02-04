import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoteScore from '../components/VoteScore';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Functional component used to handle a single comment's display.
 * @extends React
 */
function Comment (props) {
  const { comment, category, postId, openDeleteOverlay, handleCommentVote } = props;

  return (
    <div className="comment">
      <blockquote className="comment__body">{comment.body}</blockquote>
      <div className="comment__info">
        <span className="comment__info--author">
          <label className="comment__label">AUTHOR</label>
          <span className="comment__info--author">{comment.author}</span>
        </span>
      </div>
      <div className="comment__actions">
        <Link
          to={`/${category}/${postId}/edit/${comment.id}`}
          className="comment__actions--item">
          <RaisedButton label="Edit" primary={true} />
        </Link>
        <RaisedButton label="Delete" onClick={() => openDeleteOverlay({commentId: comment.id})} secondary={true} />
      </div>
      <div className="comment__vote">
        <VoteScore id={comment.id}
          handleVote={handleCommentVote}
          score={comment.voteScore}
        />
      </div>
    </div>
  )
}

Comment.propTypes = {
  category: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  openDeleteOverlay: PropTypes.func.isRequired,
  handleCommentVote: PropTypes.func.isRequired
}

export default Comment;