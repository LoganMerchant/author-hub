
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_CHAPTER } from "../utils/queries";
//import TableOfContents from '../components/TableOfContents';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Auth from '../utils/auth';

const ReadChapter = () => {
    //Variables gained through alternate means
    const { chapterId } = useParams();
    console.log(chapterId);
    let chapter;
    //Queries
    const { loading, data } = useQuery(QUERY_GET_CHAPTER, {
        variables: { id: chapterId }
    });

    if (!loading) {
        chapter = data?.getChapter || {};
    }
    console.log(chapter);


    //Actual returned HTML
    if (loading) {
        return <div>Loading...</div>
    }
    if (!loading) {
        return (
            <div>
                <div className="row">

                    <div className='col-9'>
                        <h1 className='text-center'>{chapter.title}</h1>
                        <h2>Chapter Contents:</h2>
                        <p className='text-left'>{chapter.chapterText}</p>
                    </div>
                </div>

                {Auth.loggedIn() && (
                    <div>
                        <CommentForm chapterId={chapterId} />
                    </div>
                )
                }
                <div id="comments-area">
                    {chapter.comments && <CommentList comments={chapter.comments} />}
                </div>
            </div>
        );
    }
};

export default ReadChapter;

//<div className="col-3"><TableOfContents /></div> implementing this later
