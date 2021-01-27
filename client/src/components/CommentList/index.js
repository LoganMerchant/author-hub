import React from 'react';

//import ReactionList from './ReactionList';

const CommentList = ({ comments }) => {
    console.log(comments);
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-dark text-center">Comments Section</span>
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