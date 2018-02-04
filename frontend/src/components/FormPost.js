import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Controlled component used to display the post form.
 * Uses it's own state to handle the form data.
 * @extends React
 */
class FormPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        body: '',
        author: '',
        category: ''
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  static propTypes = {
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    handleAddPost: PropTypes.func.isRequired,
    handleEditPost: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.setState({
      post: {
        ...this.state.post,
        category: this.props.category
      }
    });
  }

  componentWillReceiveProps(prevProps) {
    // Set post to state if it is passed via props
    const postData = prevProps.post || {};
    const post = postData.id ? postData : this.state.post;
    const category = postData.category ? postData.category : this.state.category;

    this.setState({
      post: {
        ...post,
        category
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.post.id) {
      this.props.handleEditPost(this.state.post);
    } else {
      this.props.handleAddPost(this.state.post);
    }
  }

  handleTextChange(e) {
    const target = e.target;
    this.setState((prevState) => {
      let post = prevState.post;
      post[target.name] = target.value;
      return {
        post
      }
    })
  }

  handleSelectChange(e, index, value) {
    this.setState((prevState) => {
      let post = prevState.post;
      post['category'] = value;
      return {
        post
      }
    })
  }

  render() {
    const { categories=[], category } = this.props;
    const { post } = this.state;

    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Title"
            onChange={this.handleTextChange}
            value={post.title}
            name="title"
          /><br />
          <TextField
            floatingLabelText="Message"
            onChange={this.handleTextChange}
            value={post.body}
            multiLine={true}
            rows={3}
            name="body"
          /><br />
          <TextField
            floatingLabelText="Author"
            onChange={this.handleTextChange}
            value={post.author}
            name="author"
          /><br />
          <SelectField
            floatingLabelText="Category"
            value={category || post.category}
            onChange={this.handleSelectChange}
            name="category"
          >
            { categories.map(cat => (
              <MenuItem
                key={cat.path}
                value={cat.path}
                primaryText={cat.name} />
            ))}
          </SelectField><br />
          <br />
          <RaisedButton type="submit" label="submit" />
        </form>
      </div>
    )
  }
}

export default FormPost;