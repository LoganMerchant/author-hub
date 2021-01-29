import React, { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_PROJECT_INFO } from "../utils/queries";
import { UPDATE_CURRENT_PROJECT, UPDATE_CHAPTERS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import ReadCollaborators from '../components/ReadCollaborators';
import ReadChapters from "../components/ReadChapters";
import UpvoteButton from "../components/UpvoteButton";
import AddApplicantButton from "../components/AddApplicantButton";

const ReadProject = () => {
    const [state, dispatch] = useStoreContext();
    const { currentProject, chapters } = state;
    const { projectId } = useParams();
    const [success, setSuccess] = useState(false);
    const [pagePopulationData, setPopulationData] = useState({
        project: {},
        collaborators: [],
        chapters: []
    });

    //Queries
    const { loading, data: projectInfo } = useQuery(QUERY_GET_PROJECT_INFO, {
        variables: { _id: projectId }
    });

    useEffect(() => {
        if (projectInfo) {
            const project = projectInfo?.getProjectInfo;

            dispatch({
                type: UPDATE_CURRENT_PROJECT,
                currentProject: project,
            });

            dispatch({
                type: UPDATE_CHAPTERS,
                chapters: project.chapters,
            });

            setPopulationData({
                project: project,
                collaborators: project.collaborators,
                chapters: project.chapters
            });
        }
    }, [projectInfo, dispatch]);

    //The Actual returned HTML
    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if (!loading) {
        return (
            <div>
                <h1 className="Header">{currentProject.title}</h1>
                <h2 className="readHeader">By: {currentProject.authorName}</h2>
                <h3 className="summary">Summary</h3>
                <p className="readSummary">{currentProject.summary}</p>
                {chapters && <ReadChapters chapters={chapters} />}
                <h3 className="chapterHeader">This Project Currently has: {currentProject.upvoteCount} Upvotes</h3>
                {Auth.loggedIn() && <UpvoteButton projectId={projectId} />}
                {currentProject.collaborators && <ReadCollaborators collaborators={currentProject.collaborators} />}
                {Auth.loggedIn() && <AddApplicantButton projectId={projectId} />}
            </div>
        );
    }
    return <div>Loading...</div>
}

export default ReadProject;

//                  {Auth.loggedIn() && <UpvoteButton projectId={projectId} />}
//                {Auth.loggedIn() && <AddApplicantButton projectId={projectId} />}
