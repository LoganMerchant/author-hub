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
import Auth from '../utils/auth';
import { UPVOTE_PROJECT } from "../utils/mutations";
const ReadChapter = () => {
    const { chapterId } = useParams;
    const { loading, data } = useQuery(QUERY_GET_CHAPTER, {
        variables: { id: chapterId }
    });
    const [upvoteProject] = useMutation(UPVOTE_PROJECT);
    const chapter = data?.chapter || {};
    const
    function addUpvote() {
        event.preventDefault();
        try {
            // add comment to database
            await upvoteProject({
                variables: { userId:  }
            });
        } catch (e) {
            console.error(e);
        }
    }
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
                        <button className="float-center" onClick={addUpvote()}>Upvote</button>
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