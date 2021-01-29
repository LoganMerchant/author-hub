import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
//import ReactionList from './ReactionList';

const CommentList = () => {
    const [state] = useStoreContext();
    const { currentChapter } = state;

    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-dark text-center">Comments Section</span>
            </div>
            <div className="card-body">
                {currentChapter.comments &&
                    currentChapter.comments.map(comment => (
                        <div>
                            <p className="pill mb-3" key={comment._id}>
                                {comment.commentText} {'// '}
                                {comment.username} on {comment.createdAt}
                            </p>
                        </div>
                    ))}
                <p className="text-center border-top border-bottom">Communities are built on conversation, and communication, so comment away!</p>
                <p className="text-center">Congrats you've reached the end of the comments section!</p>
            </div>
        </div>
    );
};

export default CommentList;


//{Auth.loggedIn && <button id="add-reaction" onClick={addReaction()}>Add Reaction</button>}
//{comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />} add these later for reactions
