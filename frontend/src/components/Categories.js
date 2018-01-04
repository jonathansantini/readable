import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Functional component used to display the category list.
 * @extends React
 */
function Categories (props) {
  const { categories, handleCategoryChange } = props;

  return (
    <div className="categories">
      <h3 className="categories__hdr">{`Categories`}</h3>
      <div className="categories__list">
        <ul className="categories__list--list">
          {categories.map((cat) => (
            <li key={cat.name} className="categories__list--item">
              <Link
                to={`/category/${cat.path}`}
                onClick={() => handleCategoryChange(cat.path)}
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

Categories.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Categories;