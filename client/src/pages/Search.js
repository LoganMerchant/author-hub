import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { Link } from "react-router-dom";
import { QUERY_GET_PROJECTS_BY_SEARCH } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const SearchBooks = () => {
  const [state, dispatch] = useStoreContext();
  // create state for holding returned Book data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenreInput] = useState("");
  const { data } = useQuery(QUERY_GET_PROJECTS_BY_SEARCH, {
    variables: { searchTerm: searchTerm, genre: genre },
  });
  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm) {
      return false;
    }

    try {
      const bookData = data.getProjectsBySearch;

      setSearchedBooks(bookData);

      setSearchTerm("");
      setGenreInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="searchHero">
        <Container>
          <h1 className="Header">Find your next read!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={12}>
                <Form.Control
                  name="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  size="md"
                  placeholder="Search for a project."
                />

                <Form.Control
                  as="select"
                  value={genre}
                  name="genreInput"
                  placeholder="Choose genre to search"
                  onChange={(e) => {
                    setGenreInput(e.target.value);
                  }}
                >
                  <option value="Choose genre to search">
                    Choose genre to search
                  </option>
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
            </Form.Row>
            <Form.Row className="searchBtn" align="center">
              <Col xs={12} md={12}>
                <Button type="submit" className="searchButton">
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2 className="searchResults">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book._id} border="dark">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/readproject/${book._id}`}>
                      {book.title} by {book.authorName}
                    </Link>
                  </Card.Title>
                  <p className="small">Author: {book.authorName}</p>
                  <Card.Text>{book.summary}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;
