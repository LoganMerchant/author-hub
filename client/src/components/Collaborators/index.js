import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { useStoreContext } from "../../utils/GlobalState";

const Collaborators = () => {
  // Pull in global state
  const [state] = useStoreContext();
  const { currentProject } = state;

  return (
    <div>
      {/* If there are any collaborators on the project... */}
      {currentProject.collaborators !== undefined ? (
        <ListGroup>
          <ListGroup.Item as="h4" className="collaborators">Collaborators:</ListGroup.Item>
          {currentProject.collaborators.map((collaborator) => (
            <ListGroup.Item className="collaborators" key={collaborator._id}>
              <p>{collaborator.username}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default Collaborators;
