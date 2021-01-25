import React, { useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
//import ReactionList from './ReactionList';

const CommentList = ({ comment }) => {
    //get the store specifically for chapter or use a prop?
    function addReaction() {
    }
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-light">Comment</span>
            </div>
            <div className="card-body">
                {comments &&
                    comments.map(comment => (
                        <div>
                            <p className="pill mb-3" key={comment._id}>
                                {comment.commentText} {'// '}
                                {comment.username} on {comment.createdAt}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CommentList;


//{Auth.loggedIn && <button id="add-reaction" onClick={addReaction()}>Add Reaction</button>}
//{comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />} add these later for reactions