import React from "react";
import Form from "react-bootstrap/Form";

const IsPublicToggleButton = ({ updatedData, setUpdatedData }) => {
  // Function to flip the boolean held in `updatedData`
  function toggle() {
    setUpdatedData({
      ...updatedData,
      isPublic: !updatedData.isPublic,
    });
  }

  return (
    <Form.Group controlId="projectIsPublic">
      {/* If it's public, make sure it's green and checked */}
      {updatedData && updatedData.isPublic === true ? (
        <Form.Check
          type="switch"
          key={updatedData.isPublic}
          defaultChecked={updatedData.isPublic}
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
