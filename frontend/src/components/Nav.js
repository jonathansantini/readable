import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import ContentSort from 'material-ui/svg-icons/content/sort';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

/**
 * Functional component used to display the category list.
 * @extends React
 */
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.category || 'all',
      filter: ''
    };

    this.handleCategory = this.handleCategory.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleCategory(e, index, value) {
    this.setState({
      value
    })
    this.props.history.push(`/${value}`);
  }

  handleFilter(e, value) {
    this.setState({
      filter: value
    })
    this.props.history.push(`${value}`);
  }

  render() {
    const { categories } = this.props;

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleCategory}>
            <MenuItem key='all' value='all' primaryText="All Categories"/>
            {categories && categories.map((cat) => (
              <MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />
            ))}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup lastChild={false}>
          <IconMenu value={this.state.filter} onChange={this.handleFilter}
            iconButtonElement={
              <IconButton touch={true}>
                <ContentSort />
              </IconButton>
            }
          >
            <MenuItem value="#day-asc" primaryText="By Day - Newest" />
            <MenuItem value="#day-desc" primaryText="By Day - Oldest" />
            <MenuItem value="#score-desc" primaryText="By Score - Most Popular" />
            <MenuItem value="#score-asc" primaryText="By Score - Least Popular" />
          </IconMenu>

        </ToolbarGroup>
      </Toolbar>
    )
  }
}

Nav.propTypes = {
  categories: PropTypes.array.isRequired
}

export default withRouter(Nav);