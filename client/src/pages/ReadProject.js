import React, { useState } from "react";
import { ADD_APPLICANT, UPVOTE_PROJECT } from "../utils/mutations";
import Auth from '../utils/auth';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_GET_PROJECT_INFO } from "../utils/queries";
import { Link } from 'react-router-dom';

const ReadProject = () => {
    // variables based on other factors like state and params
    const { projectId } = useParams();
    const userId = Auth.getProfile().data._id;
    let project = {};
    let collaborators = [];
    let chapters = [];
    const [upvotes, setUpvotes] = useState(0);
    //Queries
    const { loading, data } = useQuery(QUERY_GET_PROJECT_INFO, {
        variables: { _id: projectId }
    });
    if (!loading) {
        console.log(data);
        project = data?.getProjectInfo || {};
        collaborators = data?.getProjectInfo.collaborators || [];
        chapters = data?.getProjectInfo.chapters || [];
    }
    //Mutations
    const [upvoteProject] = useMutation(UPVOTE_PROJECT);
    const [addApplicant] = useMutation(ADD_APPLICANT);

    //query based variables


    //functions
    async function addUpvote() {
        try {
            await upvoteProject({
                variables: { userId: userId }
            });
            setUpvotes(data.upvoteCount.length);
        } catch (e) {
            console.error(e);
        }
    }
    async function applyCollaboration() {
        try {
            await addApplicant({
                variables: { collabsToAddOrDenyList: [...project.collabsToAddOrDenyList, userId] }
            });
        } catch (e) {
            console.error(e);
        }
    }

    //The Actual returned HTML
    if (!loading) {
        return (
            <div>
                <h1 className="text-center">{project.title}</h1>
                <h2 className="text-center">By: {project.authorName}</h2>
                <h3>Summary:</h3>
                <p>{project.summary}</p>
                {chapters &&
                    <div>
                        <h3 className="text-center">Public Chapters For Your Enjoyment</h3>
                        <ul>
                            {chapters.map(chapter => (
                                <li>
                                    <Link to={`/readchapter/${chapter._id}`}>{chapter.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <h3 className="text-center">This Project Currently has: {upvotes} Upvotes</h3>
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
    return <div>Loading...</div>
}

export default ReadProject;