import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CHAPTER } from "../utils/actions";
import { QUERY_CHAPTER } from "../utils/queries";
import { idbPromise } from "../../utils/helpers";
import TableOfContents from '../components/TableOfContents';
import CommentList from '../components/CommitList';
import Auth from '../utils/auth';
const ReadChapter = () => {

    function addUpvote() {

    }

    function addComment() {

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
                    <button className="float-center" onClick={addComment()}>Comment</button>
                }
            </div>
            <div id="comments-area">
                <CommentList />
            </div>
        </div>
    );
};

export default ReadChapter;