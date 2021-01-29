import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Redirect, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import spinner from "../assets/spinner.gif";
import { useStoreContext } from "../utils/GlobalState";
import Collaborators from "../components/Collaborators";
import CollaboratorsToConsider from "../components/CollaboratorsToConsider";
import IsPublicToggleButton from "../components/IsPublicToggleButton";
import TableOfContents from "../components/TableOfContents";
import { UPDATE_CURRENT_PROJECT, UPDATE_CHAPTERS } from "../utils/actions";
import { QUERY_GET_PROJECT_INFO } from "../utils/queries";
import { EDIT_PROJECT_INFO } from "../utils/mutations";

const EditProject = () => {
  // Use the global state to get currentProject
  const [state, dispatch] = useStoreContext();
  const { currentProject, chapters } = state;

  // Pull projectId from url
  const { projectId } = useParams();

  // Variables for using queries and mutations
  const { loading, data: projectInfo } = useQuery(QUERY_GET_PROJECT_INFO, {
    variables: { _id: projectId },
  });
  const [editProjectInfo] = useMutation(EDIT_PROJECT_INFO);

  // Variables for local state
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedGenre, setUpdatedGenre] = useState("");
  const [updatedSummary, setUpdatedSummary] = useState("");
  const [updatedIsPublic, setUpdatedIsPublic] = useState(false);

  // Determines if the server has returned project info
  useEffect(() => {
    if (projectInfo) {
      const project = projectInfo?.getProjectInfo;

      dispatch({
        type: UPDATE_CURRENT_PROJECT,
        currentProject: project,
      });

      dispatch({
        type: UPDATE_CHAPTERS,
        chapters: project.chapters,
      });

      setUpdatedIsPublic(project.isPublic);
      setUpdatedTitle(project.title);
      setUpdatedGenre(project.genre);
      setUpdatedSummary(project.summary);
    }
  }, [projectInfo, dispatch]);

  // Handles any changes to local state
  const handleChange = async (evt) => {
    const name = evt.target.id;
    const value = evt.target.value;

    if (name === "projectIsPublic") {
      setUpdatedIsPublic(!updatedIsPublic);
    } else if (name === "projectTitle") {
      setUpdatedTitle(value);
    } else if (name === "projectGenre") {
      setUpdatedGenre(value);
    } else {
      setUpdatedSummary(value);
    }
  };

  // Submits changes to the server via mutation
  const submitChanges = async () => {
    const { data } = await editProjectInfo({
      variables: {
        projectId,
        title: updatedTitle,
        summary: updatedSummary,
        genre: updatedGenre,
        isPublic: updatedIsPublic,
      },
    });
    const newProject = data?.editProjectInfo;

    await dispatch({
      type: UPDATE_CURRENT_PROJECT,
      currentProject: newProject,
    });

    window.location.assign(`/`);
  };

  return (
    <Container fluid className="editContainer">
      <Row>
        {/* Table of Contents */}
        <Col sm={12} md={2}>
          <TableOfContents />
        </Col>

        {/* Edit Project */}
        {loading ? (
          // If the projectInfo is loading
          <img src={spinner} alt="loading" />
        ) : (
          // If the projectInfo is available
          <Col sm={12} md={8}>
            <Form>
              {/* IsPublic toggle */}
              <IsPublicToggleButton
                updatedIsPublic={updatedIsPublic}
                setUpdatedIsPublic={setUpdatedIsPublic}
              />

              {/* Project title, genre, and summary changes */}
              <Form.Row>
                <Col sm={10} md={10}>
                  <Form.Group controlId="projectTitle">
                    <Form.Label className="editFormLabel">Title:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      defaultValue={currentProject.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col sm={2}>
                  <Form.Group controlId="projectGenre">
                    <Form.Label className="editFormLabel">Genre:</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={currentProject.genre}
                      onChange={handleChange}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>test</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Group controlId="projectSummary">
                <Form.Label className="editFormLabel">Summary:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  onChange={handleChange}
                  defaultValue={currentProject.summary}
                />
              </Form.Group>

              {/* Submit button */}
              <Button variant="info" onClick={submitChanges}>
                Submit Changes
              </Button>
            </Form>
          </Col>
        )}

        {/* Display any relevant collaborator info */}
        <Col sm={12} md={2}>
          {loading ? (
            // If the projectInfo is loading
            <img src={spinner} alt="loading" />
          ) : (
            <div>
              <Collaborators />
              <CollaboratorsToConsider projectId={projectId} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EditProject;
