import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
//import ReactionList from './ReactionList';

const CommentList = () => {
    const [state] = useStoreContext();
    const { comments } = state;

    return (
        <div className="commentCard">
            <div className="card-header">
                <span className="commentSection">Comments Section</span>
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
                <p className="communityLine">Communities are built on conversation, and communication, so comment away!</p>
                <p className="text-center">Congrats you've reached the end of the comments section!</p>
            </div>
        </div>
    );
};

export default CommentList;


//{Auth.loggedIn && <button id="add-reaction" onClick={addReaction()}>Add Reaction</button>}
//{comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />} add these later for reactions
