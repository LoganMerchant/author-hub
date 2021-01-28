import React from "react";
import Form from "react-bootstrap/Form";

const IsPublicToggleButton = ({ updatedIsPublic, setUpdatedIsPublic }) => {
  // Function to flip the boolean held in `updatedIsPublic`
  function toggle() {
    setUpdatedIsPublic(!updatedIsPublic);
  }

  return (
    <Form.Group controlId="projectIsPublic">
      {/* If it's public, make sure it's green and checked */}
      {updatedIsPublic === true ? (
        <Form.Check
          type="switch"
          defaultChecked={updatedIsPublic}
          label="Published"
          isValid
          onClick={toggle}
        />
      ) : (
        <Form.Check
          type="switch"
          label="Unpublished"
          isInvalid
          onClick={toggle}
        />
      )}
    </Form.Group>
  );
};

export default IsPublicToggleButton;
