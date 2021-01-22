import React from "react";
import TableOfContents from '../components/TableOfContents';
import CommentList from '../components/CommentList';
import Auth from '../utils/auth';
const ReadChapter = () => {

    addUpvote()

    addComment()

    applyColaboration()

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
                    <button className="float-center" onClick={applyColaboration()}>Apply To Collaborate</button>
                }
            </div>
            <div id="comments-area">
                {chapter.commentCount > 0 && <CommentList comments={chapter.comments} />}
            </div>
        </div>
    );
};

export default ReadChapter;