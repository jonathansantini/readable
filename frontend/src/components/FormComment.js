import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Functional component used to display the post form.
 * @extends React
 */
class FormComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(prevProps) {
    // Set comment to state if it is passed via props
    this.setState(prevProps.comment);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { categories=[] } = this.props;

    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="msg">Message</label>
            <textarea onChange={this.handleChange} value={this.state.body} name="body" />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input name="author" onChange={this.handleChange} value={this.state.author} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select onChange={this.handleChange} value={this.state.category} name="category">
              { categories.map(cat => (
                <option key={cat.path} value={cat.path}>{cat.name}</option>
              ))}
            </select>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
FormComment.propTypes = {
  categories: PropTypes.array.isRequired
}

export default FormComment;