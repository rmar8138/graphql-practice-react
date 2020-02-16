import React, { Component } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
} from "./../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

  handleFieldChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmitForm = event => {
    const { name, genre, authorId } = this.state;
    const { addBookMutation } = this.props;
    event.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option>Loading authors...</option>;
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  render() {
    const { name, genre } = this.state;
    return (
      <form id="add-book" onSubmit={this.handleSubmitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" onChange={this.handleFieldChange}>
            <option value="">Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
