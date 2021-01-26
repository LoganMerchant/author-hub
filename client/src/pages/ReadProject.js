import React, { useEffect, useState } from "react";
import { EDIT_PROJECT_INFO, UPVOTE_PROJECT } from "../utils/mutations";
import Auth from '../utils/auth';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_PROJECT } from "../utils/actions";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_PROJECT_INFO, QUERY_GET_USER } from "../utils/queries";
import { Link } from 'react-router-dom';

const ReadProject = () => {
    //I need to set current project in the GS still.

    // variables based on other factors like state and params
    const { projectId } = useParams;
    const userId = Auth.getProfile().data._id;
    const [upvotes, setUpvotes] = useState(data.upvoteCount);

    //Queries
    const { loading, data } = useQuery(QUERY_GET_PROJECT_INFO, {
        variables: { id: projectId }
    });
    const { userloading, userData } = useQuery(QUERY_GET_USER, {
        variables: { id: userId }
    });

    //Mutations
    const [upvoteProject] = useMutation(UPVOTE_PROJECT);
    const [editProjectInfo] = useMutation(EDIT_PROJECT_INFO);

    //query based variables
    const user = userData?.user || {};
    const project = data?.project || {};
    const collaborators = data?.project.collaborators || [];
    const chapters = data?.project.chapters || [];

    //functions
    function addUpvote() {
        try {
            await upvoteProject({
                variables: { userId: userId }
            });
            setUpvotes(data.upvoteCount);
        } catch (e) {
            console.error(e);
        }
    }
    function applyCollaboration() {
        try {
            await editProjectInfo({
                variables: { collabsToAddOrDenyList: [...project.collabsToAddOrDenyList, user] }
            });
        } catch (e) {
            console.error(e);
        }
    }

    //The Actual returned HTML
    return (
        <div>
            <h1 className="text-center">{project.title}</h1>
            <h2 className="text-center">By: {project.author}</h2>
            <h3>Summary:</h3>
            <p>{project.summary}</p>
            {chapters &&
                <div>
                    <h3 className="text-center">Public Chapters For Your Enjoyment</h3>
                    <ul>
                        {chapter.map(chapter => (
                            <li>
                                <Link to={`/chapter/${chapter._id}`}>{chapter.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <h3 className="text-center">This Project Currently has: {upvotes}</h3>
            <button className="float-center" onClick={addUpvote()}>Like What You've Been Reading Press Here to Upvote</button>
            {collaborators &&
                <div>
                    <h3 className="text-center">Project Collaborators</h3>
                    <ul>
                        {collaborators.map(collaborator => (
                            <li>
                                {collaborator.username}
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <button className="float-center" onClick={applyCollaboration()}>Apply To Collaborate</button>
        </div>
    );
}

export default ReadProject;