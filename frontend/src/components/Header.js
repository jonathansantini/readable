import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the header.
 * @extends React
 */
function Header () {

  return (
    <div className="header">
      <h2 className="header__hdr">
        <Link
        to="/"
        className="header__hdr--link">
          Readable
        </Link>
      </h2>
    </div>
  )
}

export default Header;