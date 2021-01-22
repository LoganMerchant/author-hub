import React from "react";
import TableOfContents from '../components/TableOfContents';
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
                <button className="float-center" onClick={addUpvote()}>Upvote</button>
                <button className="float-center" onClick={addComment()}>Comment</button>
                <button className="float-center" onClick={applyColaboration()}>Apply To Collaborate</button>
            </div>
            <div id="comments-area">

            </div>
        </div>
    );
};

export default ReadChapter;