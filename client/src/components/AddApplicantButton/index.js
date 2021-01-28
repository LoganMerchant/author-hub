import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_APPLICANT } from "../../utils/mutations";
import Auth from '../../utils/auth';

const AddApplicantButton = ({ projectId }) => {
    const userId = Auth.getProfile().data._id;

    const [addApplicant] = useMutation(ADD_APPLICANT);

    const applyCollaboration = async event => {
        try {
            await addApplicant({
                variables: { projectId: projectId, userId: userId }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <button className="float-center" onClick={applyCollaboration()}>Apply To Collaborate?</button>
        </div>
    );
}

export default AddApplicantButton;