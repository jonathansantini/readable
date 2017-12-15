import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, fetchCategoriesPosts } from '../actions';
import '../scss/App.css';

class App extends Component {

  componentWillMount() {
    this.props.fetchCategoriesPosts();
  }

  render() {
    const { categories = [] } = this.props;
    return (
      <div className="readable">
        <div className="readable__hdr">
          <h2>Readable</h2>
        </div>
        <p className="readable__cats">
          {categories.map((cat) => (
            <li key={cat.name}>
              {cat.name}
            </li>
          ))}
        </p>
      </div>
    );
  }
}

function mapStateToProps( data ) {
  const { categories, posts } = data.posts;
  return {
    posts,
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    fetchCategoriesPosts: (data) => dispatch(fetchCategoriesPosts(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
