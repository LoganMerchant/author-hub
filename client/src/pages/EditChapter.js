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
  const [updatedChapter, setUpdatedChapter] = useState(currentChapter);

  // Function that runs anytime a change is made to the chapter's text or title
  function handleChange() {
    const updatedTitle = document.querySelector("#formChapterTitle").value;
    const updatedText = document.querySelector("#formChapterText").value;

    setUpdatedChapter({
      ...updatedChapter,
      title: updatedTitle,
      chapterText: updatedText,
    });
  }

  // Toggles the isPublic value of local state, which will eventually be used to update the chapter's
  function toggleIsPublic() {
    const booleanValue = !updatedChapter.isPublic;

    setUpdatedChapter({
      ...updatedChapter,
      isPublic: booleanValue,
    });
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
          <Form.Group controlId="formChapterIsPublic">
            {updatedChapter.isPublic === true ? (
              <Form.Check
                type="switch"
                defaultChecked={updatedChapter.isPublic}
                label="Published"
                isValid
                onClick={toggleIsPublic}
              />
            ) : (
              <Form.Check
                type="switch"
                label="Unpublished"
                isInvalid
                onClick={toggleIsPublic}
              />
            )}
          </Form.Group>

          {/* Edits chapter's title */}
          <Form.Group controlId="formChapterTitle">
            <Form.Label column="lg">Title:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={currentChapter.title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Edits chapter's text */}
          <Form.Group controlId="formChapterText">
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
            <CommitForm updatedChapter={updatedChapter} />
            <CommitList commits={currentChapter.commits} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditChapter;
