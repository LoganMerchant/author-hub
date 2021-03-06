import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_GET_CHAPTER } from "../utils/queries";
import PublicTableOfContents from "../components/PublicTableOfContents";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_CHAPTER, UPDATE_COMMENTS } from "../utils/actions";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";

const ReadChapter = () => {
  //Variables gained through alternate means
  const [state, dispatch] = useStoreContext();
  const { currentChapter } = state;
  const { chapterId } = useParams();
  //Queries
  const { loading, data: chapterInfo } = useQuery(QUERY_GET_CHAPTER, {
    variables: { _id: chapterId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (chapterInfo) {
      const chapter = chapterInfo?.getChapter;
      const comments = chapterInfo?.getChapter.comments || [];
      console.log(comments);
      dispatch({
        type: UPDATE_CURRENT_CHAPTER,
        currentChapter: chapter,
      });
      idbPromise("currentChapter", "put", chapter);
      dispatch({
        type: UPDATE_COMMENTS,
        comments: chapter.comments,
      });
      comments.forEach((comment) => {
        idbPromise("comments", "put", comment);
      });
    } else if (!loading) {
      idbPromise("currentChapter", "get").then((chapter) => {
        dispatch({
          type: UPDATE_CURRENT_CHAPTER,
          currentChapter: chapter,
        });
      });
      idbPromise("comments", "get").then((comment) => {
        dispatch({
          type: UPDATE_COMMENTS,
          comments: comment,
        });
      });
    }
  }, [chapterInfo, currentChapter, dispatch]);

  //Actual returned HTML
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading) {
    return (
      <div>
        <h1 className="Header">{currentChapter.title}</h1>
        <div className="row">
          <div className="col-2">
            <PublicTableOfContents />
          </div>
          <div className="col-10">
            <h2 className="title">Chapter Contents:</h2>
            <p className="text-left">{currentChapter.chapterText}</p>
          </div>
        </div>

        {Auth.loggedIn() && (
          <div>
            <CommentForm />
          </div>
        )}
        <div id="comments-area">
          {currentChapter.comments && <CommentList />}
        </div>
      </div>
    );
  }
};

export default ReadChapter;
