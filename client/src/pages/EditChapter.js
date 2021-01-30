import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_CHAPTER } from "../utils/actions";
import { QUERY_GET_CHAPTER } from "../utils/queries";
import TableOfContents from "../components/TableOfContents";
import CommitForm from "../components/CommitForm";
import CommitList from "../components/CommitList";
import IsPublicToggleButton from "../components/IsPublicToggleButton";
import { idbPromise } from "../utils/helpers";

const EditChapter = () => {
  // Get currentChapter from global store
  const [state, dispatch] = useStoreContext();
  const { currentChapter, currentProject } = state;

  // Pull chapterId from params
  const { chapterId } = useParams();

  // Variables for the query
  const { loading, data: chapterInfo } = useQuery(QUERY_GET_CHAPTER, {
    variables: { _id: chapterId },
  });

  // Setup of local state for keeping track of the chapter's data
  const [updatedData, setUpdatedData] = useState({
    title: "",
    chapterText: "",
    isPublic: false,
  });

  useEffect(() => {
    // If the server returns data
    if (chapterInfo) {
      const chapter = chapterInfo?.getChapter;

      dispatch({
        type: UPDATE_CURRENT_CHAPTER,
        currentChapter: chapter,
      });

      setUpdatedData({
        title: chapter.title,
        chapterText: chapter.chapterText,
        isPublic: chapter.isPublic,
      });

      idbPromise("current-chapter", "clear");
      idbPromise("current-chapter", "put", chapter);
    }
    // If the user is offline
    else {
      const id = window.location.toString().split("/").pop();

      idbPromise("project-chapters", "find", { _id: id }).then((chapter) => {
        dispatch({
          type: UPDATE_CURRENT_CHAPTER,
          currentChapter: chapter,
        });

        idbPromise("current-chapter", "clear");

        idbPromise("current-chapter", "put", chapter);
      });
    }
  }, [chapterInfo, currentChapter, dispatch]);

  // Function that runs anytime a change is made to the chapter's text or title
  function handleChange(evt) {
    const name = evt.target.id;
    const value = evt.target.value;

    if (name === "title") {
      setUpdatedData({
        ...updatedData,
        title: value,
      });
    } else if (name === "chapterText") {
      setUpdatedData({
        ...updatedData,
        chapterText: value,
      });
    } else {
      setUpdatedData({
        ...updatedData,
        isPublic: !updatedData.isPublic,
      });
    }
  }

  function clearCurrentChapter() {
    dispatch({
      type: UPDATE_CURRENT_CHAPTER,
      currentChapter: {},
    });

    idbPromise("current-chapter", "clear");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // JSX
  return (
    <Container fluid>
      <Row>
        <Link
          to={`/editproject/${currentProject._id}`}
          style={{ color: "white" }}
          onClick={clearCurrentChapter}
        >
          <Button>Back to Project</Button>
        </Link>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <h1 style={{ borderBottom: "solid" }}>
          Editing Chapter: {currentChapter.title}
        </h1>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <p>By: {currentChapter.authorName}</p>
      </Row>
      <Row>
        {/* Table of Contents */}
        <Col sm={12} md={2}>
          <TableOfContents />
        </Col>

        {/* Chapter Edit Form */}
        <Col sm={12} md={8}>
          {/* Toggles isPublic */}
          <IsPublicToggleButton
            updatedData={updatedData}
            setUpdatedData={setUpdatedData}
          />

          {/* Edits chapter's title */}
          <Form.Group controlId="title">
            <Form.Label column="lg">Title:</Form.Label>
            <Form.Control
              as="textarea"
              key={currentChapter.title}
              defaultValue={currentChapter.title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Edits chapter's text */}
          <Form.Group controlId="chapterText">
            <Form.Label column="lg">Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={25}
              key={currentChapter.chapterText}
              defaultValue={currentChapter.chapterText}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        {/* Commit Form, which is passed updatedChapter as a prop */}
        <Col sm={12} md={2}>
          <div id="commit-container">
            <CommitForm updatedData={updatedData} />
            <CommitList commits={currentChapter.commits} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditChapter;
