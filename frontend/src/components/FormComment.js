import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the posts list.
 * @extends React
 */
function FormComment (props) {
  const {  } = props;

  return (
    <div className="form">
      COMMENT FORM
    </div>
  )
}

FormComment.propTypes = {
  post: PropTypes.object.isRequired
}

export default FormComment;