import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoteScore from '../components/VoteScore';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Comment (props) {
  const { comment, category, postId, deleteComment, handleCommentVote } = props;

  return (
    <div className="comment">
      <div className="comment__body">{comment.body}</div>
      <div className="comment__info">
        <span className="comment__info--author">{comment.author}</span>
        <span className="comment__info--score">{comment.voteScore}</span>
      </div>
      <div className="comment__actions">
        <Link
          to={`/${category}/${postId}/edit/${comment.id}`}
          className="comment__actions--edit">
          Edit
        </Link>
        <button className="comment__actions--delete" onClick={() => deleteComment(comment.id)}>Delete</button>
        <VoteScore id={comment.id} handleVote={handleCommentVote}/>
      </div>
    </div>
  )
}

Comment.propTypes = {
  category: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  handleCommentVote: PropTypes.func.isRequired
}

export default Comment;