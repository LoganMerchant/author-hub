import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPVOTE_PROJECT } from "../../utils/mutations";
import Auth from '../../utils/auth';

const UpvoteButton = ({ projectId }) => {
    const [upvoteProject] = useMutation(UPVOTE_PROJECT);
    const userId = Auth.getProfile()._id;

    const addUpvote = async event => {
        try {
            await upvoteProject({
                variables: { userId: userId }
            });
            window.location.assign(`/readproject/${projectId}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <button onClick={addUpvote()}>Like What You've Been Reading Press Here to Upvote</button>
        </div>
    );
}

export default UpvoteButton;