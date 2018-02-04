import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

/**
 * Functional component used to display a page not found message.
 * Uses withRouter to link uses back to the App root.
 * @extends React
 */
function PageNotFound () {
  return (
    <div>
      <div className="page-not-found">
        <div className="page-not-found__copy">
          Oops...Looks like something went wrong!
        </div>
        <div className="page-not-found__actions">
          <Link to="/">Click here</Link> to return to the Readable homepage.
        </div>
      </div>
    </div>
  )
}

export default withRouter(PageNotFound);