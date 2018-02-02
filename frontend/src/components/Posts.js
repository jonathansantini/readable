import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostSummary from '../components/PostSummary';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Posts (props) {
  const { posts=[] , category, deletePost, handlePostVote } = props;

  return (
    <div className="posts">
      <div className="posts__list">
        <ul className="posts__list--list">
          {posts.length ? posts.map(post => (
            <li key={post.id} className="posts__list--item">
              <PostSummary post={post}
               category={category}
               deletePost={deletePost}
               handlePostVote={handlePostVote}
              />
            </li>
          )) : (
            <li className="posts__list--item no-posts">
              Be the first to add a post to this category.
            </li>
          )}
        </ul>
      </div>
      <div className="posts__controls">
        <Link
          to={ category ? `/${category}/create` : `/create-post` }
          className="posts__controls--link">
          <RaisedButton
            label="Add Post"
            labelPosition="after"
            primary={true}
            icon={<ContentAdd />} />
        </Link>
      </div>
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  deletePost: PropTypes.func.isRequired,
  handlePostVote: PropTypes.func.isRequired
}

export default Posts;