import React, { useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import ReactionList from './ReactionList';
import { ADD_REACTION } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import Auth from '../../utils/auth';
const CommentList = ({ comments }) => {
    const [state, dispatch] = useStoreContext();
    const [currentComment, setCurrentComment] = useState({});

    addReaction = () => {
        dispatch({
            type: ADD_REACTION,
            chapter: { ...currentComment, username }
        })
        idbPromise('comment', 'put', { ...currentComment, username })
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
                            {Auth.loggedIn && <button id="add-reaction" onClick={addReaction()}>Add Reaction</button>}
                            {comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CommentList;