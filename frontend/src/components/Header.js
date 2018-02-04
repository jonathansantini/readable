import React from 'react';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router-dom';

/**
 * Functional component used to display the header.
 * @extends React
 */
function Header ({ history }) {
  return (
    <AppBar title="readable"
      showMenuIconButton={false}
      onTitleClick={() => history.push('/')} />
  )
}

export default withRouter(Header);