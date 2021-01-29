import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import spinner from "../assets/spinner.gif";
import { useStoreContext } from "../utils/GlobalState";
import Collaborators from "../components/Collaborators";
import CollaboratorsToConsider from "../components/CollaboratorsToConsider";
import IsPublicToggleButton from "../components/IsPublicToggleButton";
import TableOfContents from "../components/TableOfContents";
import { UPDATE_CURRENT_PROJECT, UPDATE_CHAPTERS } from "../utils/actions";
import { QUERY_GET_PROJECT_INFO } from "../utils/queries";
import { EDIT_PROJECT_INFO, ADD_CHAPTER } from "../utils/mutations";

const EditProject = () => {
  // Use the global state to get currentProject
  const [state, dispatch] = useStoreContext();
  const { currentProject } = state;

  // Pull projectId from url
  const { projectId } = useParams();

  // Variables for using queries and mutations
  const { loading, data: projectInfo } = useQuery(QUERY_GET_PROJECT_INFO, {
    variables: { _id: projectId },
  });
  const [editProjectInfo] = useMutation(EDIT_PROJECT_INFO);
  const [addChapter] = useMutation(ADD_CHAPTER);

  // Variables for local state
  const [success, setSuccess] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    genre: "",
    summary: "",
    isPublic: false,
  });

  // Variables & functions for modal (taken from docs)
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalChapterText, setModalChapterText] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleModalChange = (evt) => {
    const name = evt.target.id;
    const value = evt.target.value;

    if (name === "modalTitle") {
      setModalTitle(value);
    } else {
      setModalChapterText(value);
    }
  };

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

      setUpdatedData({
        title: project.title,
        genre: project.genre,
        summary: project.summary,
        isPublic: project.isPublic,
      });
    }
  }, [projectInfo, dispatch]);

  // Handles any changes to local state
  const handleChange = async (evt) => {
    const name = evt.target.id;
    const value = evt.target.value;

    if (name === "projectIsPublic") {
      setUpdatedData({
        ...updatedData,
        isPublic: !updatedData.isPublic,
      });
    } else if (name === "projectTitle") {
      setUpdatedData({
        ...updatedData,
        title: value,
      });
    } else if (name === "projectGenre") {
      setUpdatedData({
        ...updatedData,
        genre: value,
      });
    } else {
      setUpdatedData({
        ...updatedData,
        summary: value,
      });
    }
  };

  const handleAddChapter = async () => {
    await addChapter({
      variables: {
        projectId,
        title: modalTitle,
        chapterText: modalChapterText,
        authorName: currentProject.authorName,
      },
    });

    setShow(false);

    window.location.reload();
  };

  // Submits changes to the server via mutation
  const submitChanges = async () => {
    const { data } = await editProjectInfo({
      variables: {
        projectId,
        title: updatedData.title,
        summary: updatedData.summary,
        genre: updatedData.genre,
        isPublic: updatedData.isPublic,
      },
    });
    const newProject = data?.editProjectInfo;

    await dispatch({
      type: UPDATE_CURRENT_PROJECT,
      currentProject: newProject,
    });

    setSuccess(true);

    setTimeout(function () {
      setSuccess(false);
    }, 5000);
  };

  return (
    <Container fluid className="editContainer">
      <Row>
        <Link to={`/projects`} style={{ color: "white" }}>
          <Button>Back to Your Projects</Button>
        </Link>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <h1 style={{ borderBottom: "solid" }}>
          Editing Project: {currentProject.title}
        </h1>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <p>By: {currentProject.authorName}</p>
      </Row>
      <Row>
        {/* Table of Contents */}
        <Col sm={12} md={2}>
          <TableOfContents />
          <Button variant="warning" onClick={handleShow}>
            Add Chapter
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Chapter to {currentProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="modalTitle">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    onChange={handleModalChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="modalChapterText">
                  <Form.Label>Content:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={20}
                    onChange={handleModalChange}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="info" onClick={handleAddChapter}>
                Add Chapter!
              </Button>
            </Modal.Footer>
          </Modal>
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
                updatedData={updatedData}
                setUpdatedData={setUpdatedData}
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
                      key={currentProject.genre}
                      defaultValue={currentProject.genre}
                      onChange={handleChange}
                    >
                      <option value="Action/Adventure">Action/Adventure</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Historical Fiction">
                        Historical Fiction
                      </option>
                      <option value="Literary Fiction">Literary Fiction</option>
                      <option value="Romance">Romance</option>
                      <option value="Science Fiction">Science Fiction</option>
                      <option value="Short Story">Short Story</option>
                      <option value="Suspense/Thriller">
                        Suspense/Thriller
                      </option>
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
              {!success ? (
                <Button variant="info" onClick={submitChanges}>
                  Submit Changes
                </Button>
              ) : (
                <Button variant="success">Submitted!</Button>
              )}
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
