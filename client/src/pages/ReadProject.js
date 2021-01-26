import React, { useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";
import { UPVOTE_PROJECT } from "../utils/mutations";
import Auth from '../utils/auth';

const ReadProject = () => {

    const [upvoteProject] = useMutation(UPVOTE_PROJECT);
    const userId = Auth.getProfile().data._id;
    function addUpvote() {
        event.preventDefault();
        try {
            // add comment to database
            await upvoteProject({
                variables: { userId: userId }
            });
        } catch (e) {
            console.error(e);
        }
    }
    function applyCollaboration() {

    }
    return (
        <div>
            <h1 className="text-center">{project.title}</h1>
            <h2 className="text-center">By: {project.author}</h2>
            <h3>Summary:</h3>
            <p>{project.summary}</p>
            <h3 className="text-center">Public Chapters For Your Enjoyment</h3>
            <ChapterList />
            <h3 className="text-center">This Project Currently has: {project.upvoteCount}</h3>
            <button className="float-center" onClick={addUpvote()}>Like What You've Been Reading Press Here to Upvote</button>
            <h3 className="text-center">Project Collaborators</h3>
            <CollaboratorList />
            <button className="float-center" onClick={applyCollaboration()}>Apply To Collaborate</button>
        </div>
    );
}

export default ReadProject;