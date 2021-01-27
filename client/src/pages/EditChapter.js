import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useStoreContext } from "../utils/GlobalState";
import TableOfContents from "../components/TableOfContents";
import CommitForm from "../components/CommitForm";
import CommitList from "../components/CommitList";

const EditChapter = () => {
  // Get currentChapter from global store
  const [state] = useStoreContext();
  const { currentChapter } = state;

  // Setup of local state for keeping track of the chapter's data
  const [updatedTitle, setUpdatedTitle] = useState(currentChapter.title);
  const [updatedText, setUpdatedText] = useState(currentChapter.chapterText);
  const [updatedIsPublic, setUpdatedIsPublic] = useState(
    currentChapter.isPublic
  );

  // Function that runs anytime a change is made to the chapter's text or title
  function handleChange(evt) {
    evt.preventDefault();

    const name = evt.target.id;
    const value = evt.target.value;

    if (name === "title") {
      setUpdatedTitle(value);
    } else if (name === "chapterText") {
      setUpdatedText(value);
    } else {
      setUpdatedIsPublic(!updatedIsPublic);
    }
  }

  // JSX
  return (
    <Container fluid>
      <Row>
        {/* Table of Contents */}
        <Col sm={12} md={2}>
          <TableOfContents />
        </Col>

        {/* Chapter Edit Form */}
        <Col sm={12} md={8}>
          {/* Toggles isPublic */}
          <Form.Group controlId="isPublic">
            {updatedIsPublic === true ? (
              <Form.Check
                type="switch"
                defaultChecked={updatedIsPublic}
                label="Published"
                isValid
                onClick={handleChange}
              />
            ) : (
              <Form.Check
                type="switch"
                label="Unpublished"
                isInvalid
                onClick={handleChange}
              />
            )}
          </Form.Group>

          {/* Edits chapter's title */}
          <Form.Group controlId="title">
            <Form.Label column="lg">Title:</Form.Label>
            <Form.Control
              as="textarea"
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
              defaultValue={currentChapter.chapterText}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        {/* Commit Form, which is passed updatedChapter as a prop */}
        <Col sm={12} md={2}>
          <div id="commit-container">
            <CommitForm
              updatedTitle={updatedTitle}
              updatedText={updatedText}
              updatedIsPublic={updatedIsPublic}
            />
            <CommitList commits={currentChapter.commits} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditChapter;
