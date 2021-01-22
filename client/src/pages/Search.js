import React, { useState } from "react";
import SelectSearch from "react-select-search";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

// import Auth from "../utils/auth";
import { searchBooks } from "../utils/queries";
// import { useMutation } from "@apollo/react-hooks";

const SearchBooks = () => {
  // create state for holding returned Book data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  const [searchGenre, setGenreInput] = useState("");

  const options = [
    { name: "All", value: "All" },
    { name: "Action/Adventure", value: "Action/Adventure" },
    { name: "Fantasy", value: "Fantasy" },
    { name: "Historical Fiction", value: "Historical Fiction" },
    { name: "Literary Fiction", value: "Literary Fiction" },
    { name: "Romance", value: "Romance" },
    { name: "Science Fiction", value: "Science Fiction" },
    { name: "Short Story", value: "Short Story" },
    { name: "Suspense/Thriller", value: "Suspense/Thriller" },
    { name: "Women's Fiction", value: "Women's Fiction" },
    { name: "Biography", value: "Biography" },
    { name: "Autobiography", value: "Autobiography" },
    { name: "Cookbook", value: "Cookbook" },
    { name: "Essay", value: "Essay" },
    { name: "History", value: "History" },
    { name: "Memoir", value: "Memoir" },
    { name: "Poetry", value: "Poetry" },
    { name: "Self Help", value: "Self Help" },
    { name: "True Crime", value: "True Crime" },
  ];

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchBooks(searchInput, searchGenre);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authorName: book.authorName,
        genre: book.genre,
        title: book.title,
        isPublic: book.isPublic,
        collaborators: book.collaborators || "",
        summary: book.summary,
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
      setGenreInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="md"
                  placeholder="Search for a project."
                />
                <SelectSearch
                  options={options}
                  value="All"
                  name="genreInput"
                  placeholder="Choose your genre"
                  onChange={(e) => setGenreInput(e.target.value)}
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Author: {book.authorName}</p>
                  <Card.Text>{book.summary}</Card.Text>
                  <Card.Footer>{book.collaborators}</Card.Footer>
                </Card.Body>
                {/* Need to check for login and access if not public for it to be clickable*/}
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;
