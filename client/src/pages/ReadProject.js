import React, { useEffect, useState } from "react";
import CollaboratorList from "../components/CollaboratorList";

const ReadProject = () => {

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
            <h3 className="text-center">Project Collaborators</h3>
            <CollaboratorList />
            <button className="float-center" onClick={applyCollaboration()}>Apply To Collaborate</button>
        </div>
    );
}

export default ReadProject;