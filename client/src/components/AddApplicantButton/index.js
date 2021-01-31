import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_APPLICANT } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";
import Button from "react-bootstrap/Button";

const AddApplicantButton = () => {
    const [success, setSuccess] = useState(false);
    const userId = Auth.getProfile().data._id;
    const [state] = useStoreContext();
    const { currentProject } = state;
    const [addApplicant, { error }] = useMutation(ADD_APPLICANT);

    const applyCollaboration = async event => {
        event.preventDefault();
        try {
            await addApplicant({
                variables: { projectId: currentProject._id, userId: userId }
            });
            setSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="upvoteButtonDiv">
            {!success ? (
                <Button variant="info" className="upvoteButton" onClick={applyCollaboration}>
                    Want to be a collaborator. Click Here.
                </Button>
            ) : (
                    <Button variant="success" className="upvoteButton">Application Submitted! Please wait for the author to accept or deny your request.</Button>
                )}
        </div>
    );
}

export default AddApplicantButton;