import React from 'react';
import { useMutation } from '@apollo/react-hooks';

const ReadCollaborators = ({ collaborators }) => {

    return (
        <div>
            {collaborators.length > 0 &&
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
        </div>
    );

}

export default ReadCollaborators;