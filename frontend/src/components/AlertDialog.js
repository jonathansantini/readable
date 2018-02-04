import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Controlled component used to display the alert dialog.
 * @extends React
 */
class AlertDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }

  render() {
    const { open, message, onCancel, onRequestClose } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={onCancel}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={onRequestClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={open}
      >
        {message}
      </Dialog>
    )
  }
}

export default AlertDialog;