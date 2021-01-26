import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
//import ReactionList from './ReactionList';

const CommentList = () => {
    const [state] = useStoreContext();
    const { currentChapter } = state;
    const comments = currentChapter.comments;
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