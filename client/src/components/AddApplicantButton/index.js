import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_APPLICANT } from "../../utils/mutations";
import Auth from '../../utils/auth';

const AddApplicantButton = ({ projectId }) => {
    const userId = Auth.getProfile().data._id;

    const [addApplicant, { error }] = useMutation(ADD_APPLICANT);

    const applyCollaboration = async event => {
        event.preventDefault();
        try {
            await addApplicant({
                variables: { projectId: projectId, userId: userId }
            });
            window.alert("Your username has been added to this projects collaborators applicant list, please wait for the current author or collaborators to accept your collaboration request.");
            window.location.assign(`/readproject/${projectId}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="upvoteButtonDiv">
            <button className="upvoteButton" onClick={applyCollaboration}>Apply To Collaborate?</button>
        </div>
    );
}

export default AddApplicantButton;