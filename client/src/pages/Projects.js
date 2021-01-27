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
import { useMutation } from "@apollo/react-hooks";

import { Link } from "react-router-dom";
import { QUERY_GET_USER } from "../utils/queries";
import { ADD_PROJECT } from "../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
// import UserProject from "../components/UserProject";
// import UserCollaborations from "../components/UserCollaborations";
import Auth from "../utils/auth";

const Projects = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenreInput] = useState("");
  const [summary, setSummary] = useState("");
  const [addProject] = useMutation(ADD_PROJECT);
  //defining these variables globally so they can be accessed after loading
  let projects = [];
  let collaborations = [];

  // get user from token as they need to be signed in to use this page
  const { username: authorName, _id: currentUser } = Auth.getProfile().data;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!title) {
      return false;
    }

    try {
      const { data } = await addProject({
        variables: {
          title: title,
          genre: genre,
          summary: summary,
          authorName: authorName,
        },
      });
      // if successful then fetch projects then set projects for component state
    } catch (e) {
      console.error(e);
    }
  };
  // query for current user to access their projects and collaborations

  const { loading, data } = useQuery(QUERY_GET_USER, {
    variables: { _id: currentUser },
  });

  if (!loading) {
    projects = data?.getUser.projects || [];
    collaborations = data?.getUser.collaborations || [];
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Create a Project</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  size="md"
                  placeholder="Title your project."
                />
                <Form.Control
                  as="textarea"
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  type="text"
                  size="md"
                  placeholder="Short summary about your project."
                />
                <Form.Control
                  as="select"
                  value={genre}
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
                  Create Project
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      <Container>
        <h1>Projects</h1>
        <hr></hr>
        {/* <UserProject projects={projects} />
        projects will be value of useState
        */}
        <CardColumns>
          {projects.map((myProjects) => {
            return (
              <Card key={myProjects._id} border="dark">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/editproject/${myProjects._id}`}>
                      {myProjects.title}
                    </Link>
                  </Card.Title>
                  <p className="small">Genre: {myProjects.genre}</p>
                  <Card.Text>{myProjects.summary}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>

        <br></br>
        <h1>Collaborations</h1>
        <hr></hr>
        <CardColumns>
          {collaborations.map((myCollaborations) => {
            return (
              <Card key={myCollaborations._id} border="dark">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/editproject/${myCollaborations._id}`}>
                      {myCollaborations.title}
                    </Link>
                  </Card.Title>
                  <p className="small">Genre: {myCollaborations.genre}</p>
                  <Card.Text>{myCollaborations.summary}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Projects;
