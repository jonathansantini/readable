import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function FormPost (props) {
  const {  } = props;

  return (
    <div className="form">
      POST FORM
    </div>
  )
}

FormPost.propTypes = {
  post: PropTypes.object.isRequired
}

export default FormPost;