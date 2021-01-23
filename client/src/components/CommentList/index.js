import React from 'react';

const CommentList = ({ comments }) => {


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
                            <button id="add-reaction" onClick={addReaction()}>Add Reaction</button>
                            {comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CommentList;