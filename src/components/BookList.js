import React, { Component } from "react";
import { graphql } from "react-apollo";
import BookDetails from "./BookDetails";
import { getBooksQuery } from "./../queries/queries";

class BookList extends Component {
  state = {
    selected: null
  };

  handleListItemClick = id => {
    return event => {
      this.setState({ selected: id });
    };
  };

  displayBooks = () => {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => (
        <li key={book.id} onClick={this.handleListItemClick(book.id)}>
          {book.name}
        </li>
      ));
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
