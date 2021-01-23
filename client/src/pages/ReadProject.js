import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CHAPTERS, ADD_COMMENT, ADD_UPVOTE, ADD_COLLABORATOR } from "../utils/actions";
import { QUERY_CHAPTER } from "../utils/queries";
import TableOfContents from '../components/TableOfContents';
import CommentList from '../components/CommitList';
import Auth from '../utils/auth';
const ReadChapter = () => {
    const [state, dispatch] = useStoreContext;
    const { id } = useParams();
    const [currentChapter, setCurrentChapter] = useState({});
    const [currentProject, setCurrentProject] = useState({});
    const { loading, data } = useQuery(QUERY_CHAPTER);
    const { project, chapter } = state;
    useEffect(() => {
        if (project.chapter.length) {
            setCurrentChapter(chapter.find(chapter => chapter._id === id));
        }
        else if (data) {
            dispatch({
                type: UPDATE_CHAPTERS,
                chapters: data.chapters
            })
            data.chapters.forEach((chapter) => {
                idbPromise('chapters', 'put', chapter)
            });
        }
        else if (!loading) {
            idbPromise('chapters', 'get').then((indexedChapters) => {
                dispatch({
                    type: UPDATE_CHAPTERS,
                    chapters: indexedChapters
                })
            })
        }
    }, [chapter, data, loading, dispatch, id]); //I think setting current project goes here, but I'm unsure.
    addUpvote = () => {
        dispatch({
            type: ADD_UPVOTE,
            chapter: { ...currentChapter, user_id }
        })
        idbPromise('chapter', 'put', { ...currentChapter, user_id })
    }

    addComment = () => {
        dispatch({
            type: ADD_COMMENT,
            chapter: { ...currentChapter, commentText, commentType, username }// after the , would be the commit info, as I do not have the modal, I have no idea how to handle this...
        })
        idbPromise('chapter', 'put', { ...currentChapter, commentText, commemtType, username }) //again guesing here.
    }

    applyCollaboration = () => {
        dispatch({
            type: ADD_COLLABORATOR,
            project: { ...currentProject, user }
        })
        idbPromise('project', 'put', { ...currentProject, user })
    }

    return (
        <div>
            <div className="row">
                <div className="col-3"><TableOfContents /></div>
                <div className='col-9'>
                    <p className='text-center'>{chapter.title}</p>
                    <p className='text-left'>{chapter.chapterText}</p>
                </div>
            </div>
            <div id="button-container">
                {Auth.loggedIn() &&
                    <button className="float-center" onClick={addUpvote()}>Upvote</button> &&
                    <button className="float-center" onClick={addComment()}>Comment</button> &&
                    <button className="float-center" onClick={applyCollaboration()}>Apply To Collaborate</button>
                }
            </div>
            <div id="comments-area">
                {chapter.commentCount > 0 && <CommentList comments={chapter.comments} />}
            </div>
        </div>
    );
};

export default ReadChapter;