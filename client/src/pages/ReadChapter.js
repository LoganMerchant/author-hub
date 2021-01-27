import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_CHAPTER } from "../utils/actions";
import { QUERY_GET_CHAPTER } from "../utils/queries";
import { idbPromise } from "../../utils/helpers";
import TableOfContents from '../components/TableOfContents';
import CommentList from '../components/CommitList';
import CommentForm from '../components/CommentForm';

const ReadChapter = () => {
    const [state, dispatch] = useStoreContext();

    //Variables gained through alternate means
    const { chapterId } = useParams;

    //Queries
    const { loading, data: chapterData } = useQuery(QUERY_GET_CHAPTER, {
        variables: { id: chapterId }
    });

    //Queried variables
    const { currentChapter } = state;
    const chapter = currentChapter;
    //Updating Current Chapter in the GS
    useEffect(() => {
        if (chapterData) {
            dispatch({
                type: UPDATE_CURRENT_CHAPTER,
                currentProject: chapterData
            });
            idbPromise('current-chapter', 'put', chapterData);
        }
        else if (!loading) {
            idbPromise('current-chapter', 'get').then(currentChapter => {
                dispatch({
                    type: UPDATE_CURRENT_CHAPTER,
                    currentChapter: currentChapter
                });
            });
        }
    }, [currentChapter, dispatch]);

    //Actual returned HTML
    if (loading) {
        return <div>Loading...</div>
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
                {Auth.loggedIn() && (
                    <div>
                        <CommentForm />
                    </div>
                )
                }
            </div>
            <div id="comments-area">
                <CommentList />
            </div>
        </div>
    );
};

export default ReadChapter;