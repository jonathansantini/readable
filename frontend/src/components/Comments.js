import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

/**
 * Functional component used to handle displaying a list of comments..
 * @extends React
 */
function Comments (props) {
  const { comments, category, postId, openDeleteOverlay, handleCommentVote } = props;

  return (
    <div className="comments">
      <h3 className="comments__hdr">Comments</h3>
      <ul className="comments__list">
        { comments.length ? comments.map((comment) => (
          <li className="comments__list--item" key={comment.id} >
            <Comment category={category}
              postId={postId}
              comment={comment}
              openDeleteOverlay={openDeleteOverlay}
              handleCommentVote={handleCommentVote}
            />
          </li>
        )) : (
          <li className="comments__list--item no-comments">
            Be the first to enter a comment.
          </li>
        )}
      </ul>
      <div className="comments__actions">
        <Link
          to={`/${category}/${postId}/create`}
          className="comments__actions--link">
          <RaisedButton
            label="Add Comment"
            labelPosition="after"
            primary={true}
            icon={<ContentAdd />} />
        </Link>
      </div>
    </div>
  )
}

Comments.propTypes = {
  category: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  openDeleteOverlay: PropTypes.func.isRequired,
  handleCommentVote: PropTypes.func.isRequired
}

export default Comments;