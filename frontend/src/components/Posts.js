import React from 'react';
import PropTypes from 'prop-types';
import PostSummary from '../components/PostSummary';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function Posts (props) {
  const { posts , category } = props;
  return (
    <div className="posts">
      <h3 className="posts__hdr">{`Posts (${category})`}</h3>
      <div className="posts__list">
        <ul className="posts__list--list">
          {posts.length ? posts.map(post => (
            <li key={post.id} className="posts__list--item">
              <PostSummary post={post}
               category={category}
              />
            </li>
          )) : (
            <li className="posts__item--item no-posts">
              Be the first to add a post to this category.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

Posts.propTypes = {
  category: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired
}

export default Posts;