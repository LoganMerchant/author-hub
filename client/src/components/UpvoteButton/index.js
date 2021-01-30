import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPVOTE_PROJECT } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";

const UpvoteButton = () => {
    const [state] = useStoreContext();
    const { currentProject } = state;
    const [upvoteProject, { error }] = useMutation(UPVOTE_PROJECT);
    const userId = Auth.getProfile().data._id;
    const addUpvote = async event => {
        event.preventDefault();
        try {
            await upvoteProject({
                variables: { projectId: currentProject._id, userId: userId }
            });
            window.location.assign(`/readproject/${currentProject._id}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="upvoteButtonDiv">
            <button className="upvoteButton" onClick={addUpvote}>Like What You've Been Reading Press Here to Upvote</button>
        </div>
    );
}

export default UpvoteButton;