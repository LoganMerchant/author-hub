import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import ListGroup from "react-bootstrap/ListGroup";

import { useStoreContext } from "../../utils/GlobalState";
import { QUERY_GET_PROJECT_INFO } from "../../utils/queries";
import { UPDATE_CHAPTERS } from "../../utils/actions";

const TableOfContents = ({ projectId }) => {
  const [state, dispatch] = useStoreContext();
  const { currentChapter, chapters } = state;

  const { loading, data } = useQuery(QUERY_GET_PROJECT_INFO, {
    variables: { _id: projectId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      const projectChapters = data?.getProjectInfo.chapters;

      dispatch({
        type: UPDATE_CHAPTERS,
        chapters: projectChapters,
      });
    }
  }, [data, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ListGroup>
      {/* Header of ToC */}
      <ListGroup.Item>
        <h3 className="table">Table of Contents</h3>
      </ListGroup.Item>

      {chapters &&
        chapters.map((chapter, index) => (
          <div key={chapter._id}>
            <Link to={`/editchapter/${chapter._id}`}>
              {/* If the chapter is public */}
              <ListGroup.Item action>
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
