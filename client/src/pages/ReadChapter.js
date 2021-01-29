
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_CHAPTER } from "../utils/queries";
//import PublicTableOfContents from '../components/PublicTableOfContents';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_CHAPTER } from "../utils/actions";
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

const ReadChapter = () => {
    //Variables gained through alternate means
    const [state, dispatch] = useStoreContext();
    const { currentChapter } = state;
    const { chapterId } = useParams();
    //Queries
    const { loading, data: chapterInfo } = useQuery(QUERY_GET_CHAPTER, {
        variables: { _id: chapterId }
    });

    useEffect(() => {
        if (chapterInfo) {
            const chapter = chapterInfo?.getChapter;

            dispatch({
                type: UPDATE_CURRENT_CHAPTER,
                currentChapter: chapter,
            });
        }
    }, [chapterInfo, currentChapter, dispatch]);



    //Actual returned HTML
    if (loading) {
        return <div>Loading...</div>
    }
    if (!loading) {
        return (
            <div>
                <div className="row">

                    <div className='col-9'>
                        <h1 className='text-center'>{currentChapter.title}</h1>
                        <h2>Chapter Contents:</h2>
                        <p className='text-left'>{currentChapter.chapterText}</p>
                    </div>
                </div>

                {Auth.loggedIn() && (
                    <div>
                        <CommentForm />
                    </div>
                )
                }
                <div id="comments-area">
                    {currentChapter.comments && <CommentList />}
                </div>
            </div>
        );
    }
};

export default ReadChapter;

//<div className="col-3"><TableOfContents /></div> implementing this later
