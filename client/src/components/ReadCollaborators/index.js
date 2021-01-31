import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
const ReadCollaborators = () => {
    const [state] = useStoreContext();
    const { currentProject } = state;
    return (
        <div>
            {currentProject.collaborators.length > 0 &&
                <div>
                    <h3 className="text-center">Project Collaborators</h3>
                    <ul>
                        {currentProject.collaborators.map(collaborator => (
                            <li key={collaborator._id}>
                                {collaborator.username}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );

}

export default ReadCollaborators;