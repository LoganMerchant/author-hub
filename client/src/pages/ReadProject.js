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
import { idbPromise } from "../utils/helpers";

const ReadProject = () => {
    const [state, dispatch] = useStoreContext();
    const { currentProject, chapters } = state;
    const { projectId } = useParams();

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
            idbPromise("currentProject", "put", project);
            dispatch({
                type: UPDATE_CHAPTERS,
                chapters: project.chapters,
            });
            project.chapters.forEach((chapter) => {
                idbPromise("projectChapters", "put", chapter);
            });
        }
        else if (!loading) {
            idbPromise("currentProject", "get").then((currentProject) => {
                dispatch({
                    type: UPDATE_CURRENT_PROJECT,
                    currentProject: currentProject,
                })
            });
            idbPromise("projectChapters", "get").then((projectChapters) => {
                dispatch({
                    type: UPDATE_CHAPTERS,
                    chapters: projectChapters,
                })
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
                {chapters && <ReadChapters />}
                <h3 className="chapterHeader">This Project Currently has: {currentProject.upvoteCount} Upvotes</h3>
                {Auth.loggedIn() && <UpvoteButton />}
                {currentProject.collaborators && <ReadCollaborators />}
                {Auth.loggedIn() && <AddApplicantButton />}
            </div>
        );
    }
    return <div>Loading...</div>
}

export default ReadProject;
