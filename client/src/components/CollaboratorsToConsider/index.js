import React from "react";
import { useMutation } from "@apollo/react-hooks";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_PROJECT } from "../../utils/actions";
import { ACCEPT_COLLABORATOR, DENY_COLLABORATOR } from "../../utils/mutations";

const CollaboratorsToConsider = ({ projectId }) => {
  // Pull in global state
  const [state, dispatch] = useStoreContext();
  const { currentProject } = state;

  // Variables to use mutations
  const [acceptCollaborator] = useMutation(ACCEPT_COLLABORATOR);
  const [denyCollaborator] = useMutation(DENY_COLLABORATOR);

  // Function to accept a collaborator
  const handleCollabAccept = async (_id) => {
    const { data } = await acceptCollaborator({
      variables: { projectId, userId: _id },
    });
    const newProject = data?.acceptCollaborator;

    dispatch({
      type: UPDATE_CURRENT_PROJECT,
      currentProject: newProject,
    });
  };

  // Function to deny a collaborator
  const handleCollabDeny = async (_id) => {
    const { data } = await denyCollaborator({
      variables: { projectId, userId: _id },
    });
    const newProject = data?.acceptCollaborator;

    dispatch({
      type: UPDATE_CURRENT_PROJECT,
      currentProject: newProject,
    });
  };

  return (
    <div>
      {/* If there are any collaborators waiting to apply... */}
      {currentProject.collabsToAddOrDenyList !== undefined ? (
        <ListGroup>
          <ListGroup.Item as="h4">Collaborators to Consider:</ListGroup.Item>
          {currentProject.collabsToAddOrDenyList.map((collaborator) => (
            <ListGroup.Item key={collaborator._id}>
              <p>{collaborator.username}</p>
              <ButtonGroup size="lg">
                <Button
                  variant="success"
                  onClick={() => handleCollabAccept(collaborator._id)}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCollabDeny(collaborator._id)}
                >
                  Deny
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default CollaboratorsToConsider;
