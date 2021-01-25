import React, { useState, useEffect } from "react";
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
import { QUERY_GET_PROJECTS_BY_SEARCH } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const SearchBooks = () => {
  // create state for holding returned Book data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  const [searchGenre, setGenreInput] = useState("");
  const { loading, data: searchData } = useQuery(QUERY_GET_PROJECTS_BY_SEARCH, {
    variables: searchInput,
    searchGenre,
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // const response = await searchBooks(searchInput, searchGenre);
      const bookData = searchData;
      // const { items } = await response.json();

      // const bookData = items.map((book) => ({
      //   bookId: book.id,
      //   authorName: book.authorName,
      //   genre: book.genre,
      //   title: book.title,
      //   isPublic: book.isPublic,
      //   collaborators: book.collaborators || "",
      //   summary: book.summary,
      // }));

      // setSearchedBooks(bookData);

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

                <Form.Control
                  as="select"
                  value={searchGenre}
                  name="genreInput"
                  placeholder="Choose your genre"
                  onChange={(e) => {
                    setGenreInput(e.target.value);
                  }}
                >
                  <option value="All">All</option>
                  <option value="Action/Adventure">Action/Adventure</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Literary Fiction">Literary Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Short Story">Short Story</option>
                  <option value="Suspense/Thriller">Suspense/Thriller</option>
                  <option value="Women's Fiction">Women's Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="Autobiography">Autobiography</option>
                  <option value="Cookbook">Cookbook</option>
                  <option value="Essay">Essay</option>
                  <option value="History">History</option>
                  <option value="Memoir">Memoir</option>
                  <option value="Poetry">Poetry</option>
                  <option value="Self Help">Self Help</option>
                  <option value="True Crime">True Crime</option>
                </Form.Control>
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
