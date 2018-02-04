import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Controlled component used to display the comment form.
 * Uses it's own state to handle the form data.
 * @extends React
 */
class FormComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        id: '',
        body: '',
        author: ''
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  static propTypes = {
    comment: PropTypes.object.isRequired,
    handleAddComment: PropTypes.func.isRequired,
    handleEditComment: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(prevProps) {
    // Set comment to state if it is passed via props
    const cData = prevProps.comment || {};
    const comment = cData.id ? cData : this.state.comment;

    this.setState({
      comment
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.comment.id) {
      this.props.handleEditComment(this.state.comment);
    } else {
      this.props.handleAddComment(this.state.comment);
    }
  }

  handleTextChange(e) {
    const target = e.target;
    this.setState((prevState) => {
      let comment = prevState.comment;
      comment[target.name] = target.value;
      return {
        comment
      }
    })
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Message"
            onChange={this.handleTextChange}
            value={this.state.comment.body}
            name="body"
          /><br />
          <TextField
            floatingLabelText="Author"
            onChange={this.handleTextChange}
            value={this.state.comment.author}
            name="author"
          /><br />
          <RaisedButton type="submit" label="submit" />
        </form>
      </div>
    )
  }
}

export default FormComment;