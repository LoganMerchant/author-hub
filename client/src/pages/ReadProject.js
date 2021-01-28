import React from "react";
import Auth from '../utils/auth';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GET_PROJECT_INFO } from "../utils/queries";
import ReadCollaborators from '../components/ReadCollaborators';
import ReadChapters from "../components/ReadChapters";
import UpvoteButton from "../components/UpvoteButton";
import AddApplicantButton from "../components/AddApplicantButton";

const ReadProject = () => {
    // variables based on other factors like state and params
    const { projectId } = useParams();
    let project = {};
    let collaborators = [];
    let chapters = [];
    //Queries
    const { loading, data } = useQuery(QUERY_GET_PROJECT_INFO, {
        variables: { _id: projectId }
    });
    if (!loading) {
        console.log(data);
        project = data?.getProjectInfo || {};
        collaborators = data?.getProjectInfo.collaborators || [];
        let initialChapters = data?.getProjectInfo.chapters || [];
        chapters = initialChapters?.filter(chapter => chapter.isPublic) || [];
    }

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
                <h1 className="text-center">{project.title}</h1>
                <h2 className="text-center border-bottom">By: {project.authorName}</h2>
                <h3 className="text-center border-bottom">Summary</h3>
                <p className="border-bottom">{project.summary}</p>
                <ReadChapters chapters={chapters} />
                <h3 className="text-center">This Project Currently has: {project.upvoteCount} Upvotes</h3>
                {Auth.loggedIn() && <UpvoteButton projectId={projectId} />}
                <ReadCollaborators collaborators={collaborators} />
                {Auth.loggedIn() && <AddApplicantButton projectId={projectId} />}
            </div>
        );
    }
    return <div>Loading...</div>
}

export default ReadProject;

//                           