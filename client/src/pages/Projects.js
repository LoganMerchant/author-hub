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
import { useMutation } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";
import {
  UPDATE_CURRENT_PROJECTS,
  UPDATE_CURRENT_COLLABORATIONS,
} from "../utils/actions";
import { Link } from "react-router-dom";
import { QUERY_GET_USER } from "../utils/queries";
import { ADD_PROJECT } from "../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";

const Projects = () => {
  const [state, dispatch] = useStoreContext();
  const { projects, collaborations } = state;
  const [title, setTitle] = useState("");
  const [genre, setGenreInput] = useState("");
  const [summary, setSummary] = useState("");
  const [addProject] = useMutation(ADD_PROJECT);
  //defining these variables globally so they can be accessed after loading
  // let projects = [];
  // let collaborations = [];

  // get user from token as they need to be signed in to use this page
  const { username: authorName, _id: currentUser } = Auth.getProfile().data;

  // query for current user to access their projects and collaborations

  const { loading, data } = useQuery(QUERY_GET_USER, {
    variables: { _id: currentUser },
  });

  useEffect(() => {
    if (data) {
      const currentProjects = data?.getUser.projects || [];
      const currentCollaborations = data?.getUser.collaborations || [];
      dispatch({
        type: UPDATE_CURRENT_PROJECTS,
        projects: currentProjects,
      });
      dispatch({
        type: UPDATE_CURRENT_COLLABORATIONS,
        collaborations: currentCollaborations,
      });
    }
  }, [data, dispatch]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!title) {
      return false;
    }
    // if successful then fetch projects then set projects for component state
    try {
      const { data } = await addProject({
        variables: {
          title: title,
          genre: genre,
          summary: summary,
          authorName: authorName,
        },
      });
      window.location.assign(`/projects/`);
    } catch (e) {
      console.error(e);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading) {
    return (
      <>
        <Jumbotron fluid className="projectHero">
          <Container>
            <h1 className="Header">Write Your Novel.</h1>
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Col xs={12} md={12}>
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
                    placeholder="Please choose a genre"
                    onChange={(e) => {
                      setGenreInput(e.target.value);
                    }}
                  >
                    <option value="Please choose a genre">
                      Please choose a genre
                    </option>
                    <option value="Action/Adventure">Action/Adventure</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Historical Fiction">
                      Historical Fiction
                    </option>
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
              <Form.Row className="projectBtn">
                <Col xs={12} md={12}>
                  <Button
                    className="projectButton"
                    type="submit"
                    align="center"
                  >
                    Create
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Container>
        </Jumbotron>
        <Container>
          <h1 className="Header">Projects</h1>
          <hr></hr>
          <CardColumns className="title">
            {projects.map((myProjects) => {
              return (
                <Card key={myProjects._id} className="projectCard">
                  <Card.Body className="cardTitle">
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
                        {myCollaborations.title} by {myCollaborations.username}
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
  }
};

export default Projects;
