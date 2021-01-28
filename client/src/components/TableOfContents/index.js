import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CHAPTER } from "../../utils/actions";

const TableOfContents = () => {
  const [state, dispatch] = useStoreContext();
  const { currentChapter, chapters } = state;

  // Will update the global state's `currentChapter` and redirect to read chapter on click.
  const handleOnClick = async (chapter) => {
    await dispatch({
      type: UPDATE_CURRENT_CHAPTER,
      currentChapter: chapter,
    });
  };

  return (
    <ListGroup>
      {/* Header of ToC */}
      <ListGroup.Item>
        <h3>Table of Contents</h3>
      </ListGroup.Item>

      {chapters.map((chapter, index) => (
        <div key={chapter._id}>
          <Link to={`/editchapter/${chapter._id}`}>
            {/* If the chapter is public */}
            <ListGroup.Item action onClick={() => handleOnClick(chapter)}>
              {/* Highlights the currentChapter */}
              {currentChapter._id === chapter._id ? (
                <h4 style={{ color: "#EF5D58" }}>
                  {index + 1}. {chapter.title}
                </h4>
              ) : (
                <h4>
                  {index + 1}. {chapter.title}
                </h4>
              )}
              {!chapter.isPublic && <p>Unpublished</p>}
            </ListGroup.Item>
          </Link>
        </div>
      ))}
    </ListGroup>
  );
};

export default TableOfContents;
