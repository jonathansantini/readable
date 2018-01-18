import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the category list.
 * @extends React
 */
function Nav (props) {
  const { categories } = props;

  return (
    <div className="nav">
      <div className="nav__list">
        <ul className="nav__list--list">
          {categories && categories.map((cat) => (
            <li key={cat.name} className="nav__list--item">
              <Link
                to={`/${cat.path}`}
                data-category-path={cat.path}>
                  {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Nav.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Nav;