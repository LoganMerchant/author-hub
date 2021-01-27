import React, { useEffect, useState } from "react";
import { ADD_APPLICANT, UPVOTE_PROJECT } from "../utils/mutations";
import Auth from '../utils/auth';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_PROJECT, UPDATE_CHAPTERS } from "../utils/actions";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_GET_PROJECT_INFO } from "../utils/queries";
import { Link } from 'react-router-dom';
import { idbPromise } from "../utils/helpers";

const ReadProject = () => {
    const [state, dispatch] = useStoreContext();

    //Queries
    const { loading, data: projectData } = useQuery(QUERY_GET_PROJECT_INFO, {
        variables: { id: projectId }
    });

    //Mutations
    const [upvoteProject] = useMutation(UPVOTE_PROJECT);
    const [addApplicant] = useMutation(ADD_APPLICANT);

    // variables based on other factors like state and params
    const { projectId } = useParams;
    const userId = Auth.getProfile().data._id;
    const [upvotes, setUpvotes] = useState(projectData.upvoteCount);

    //query based variables
    const { currentProject, chapters } = state;
    const collaborators = currentProject?.project.collaborators || [];
    const initialChapters = chapters?.chapters || [];
    const pageChapters = initialChapters?.initialChapters.filter(chapter => chapter.isPublic) || [];

    //updating the current project and chapters in the GS
    //for currentproject
    useEffect(() => {
        if (projectData) {
            dispatch({
                type: UPDATE_CURRENT_PROJECT,
                currentProject: projectData
            });
            idbPromise('current-project', 'put', projectData);
        }
        else if (!loading) {
            idbPromise('current-project', 'get').then(project => {
                dispatch({
                    type: UPDATE_CURRENT_PROJECT,
                    currentProject: project
                });
            });
        }
    }, [projectData, dispatch]);
    //for chapters
    useEffect(() => {
        if (projectData) {
            dispatch({
                type: UPDATE_CHAPTERS,
                chapters: projectData.chapters
            });
            projectData.chapters.forEach(chapter => {
                idbPromise('project-chapters', 'put', chapter)
            })
        }
        else if (!loading) {
            idbPromise('project-chapters', 'get').then(chapters => {
                dispatch({
                    type: UPDATE_CHAPTERS,
                    chapters: chapters
                });;
            });
        }
    }, [chapters, dispatch]);

    //functions
    async function addUpvote() {
        try {
            await upvoteProject({
                variables: { userId: userId }
            });
            setUpvotes(projectData.upvoteCount);
        } catch (e) {
            console.error(e);
        }
    }
    async function applyCollaboration() {
        try {
            await addApplicant({
                variables: { collabsToAddOrDenyList: [...projectData.collabsToAddOrDenyList, userId] }
            });
        } catch (e) {
            console.error(e);
        }
    }

    //The Actual returned HTML
    return (
        <div>
            <h1 className="text-center">{currentProject.title}</h1>
            <h2 className="text-center">By: {currentProject.author}</h2>
            <h3>Summary:</h3>
            <p>{currentProject.summary}</p>
            {pageChapters &&
                <div>
                    <h3 className="text-center">Public Chapters For Your Enjoyment</h3>
                    <ul>
                        {pageChapters.map(chapter => (
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