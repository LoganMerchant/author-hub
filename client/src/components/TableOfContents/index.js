import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CHAPTER } from "../../utils/actions";

const TableOfContents = () => {
  const [state, dispatch] = useStoreContext();
  const { currentChapter, chapters } = state;

  // Will update the global state's `currentChapter` when a chapter is clicked.
  const handleOnClick = (chapter) => {
    dispatch({
      type: UPDATE_CURRENT_CHAPTER,
      currentChapter: chapter,
    });
  };

  return (
    <Container fluid>
      <ListGroup variant="flush">
        <Row>
          {/* Header of ToC */}
          <Col sm={12} md={3}>
            <ListGroup.Item>
              <h2>Table of Contents</h2>
            </ListGroup.Item>
          </Col>
        </Row>
        {chapters.map((chapter) =>
          // If the chapter is set to be public....
          chapter.isPublic ? (
            <Row>
              <Col sm={12} md={3}>
                <ListGroup.Item
                  action
                  key={chapter._id}
                  onClick={() => handleOnClick(chapter)}
                >
                  {/* Highlights the currentChapter */}
                  {currentChapter._id === chapter._id ? (
                    <h4 style={{ color: "#EF5D58" }}>{chapter.title}</h4>
                  ) : (
                    <h4>{chapter.title}</h4>
                  )}
                </ListGroup.Item>
              </Col>
            </Row>
          ) : (
            // If the chapter is set to be private...
            <Row>
              <Col sm={12} md={3}>
                <ListGroup.Item disabled key={chapter._id}>
                  <h4>{chapter.title}</h4>
                  <p>(Unpublished)</p>
                </ListGroup.Item>
              </Col>
            </Row>
          )
        )}
      </ListGroup>
    </Container>
  );
};

export default TableOfContents;
