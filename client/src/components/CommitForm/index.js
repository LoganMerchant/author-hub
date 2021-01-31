import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/react-hooks";

import { ADD_COMMIT } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";

const CommitForm = ({ updatedData }) => {
  // Gets currentChapter from global store
  const [state] = useStoreContext();
  const { currentChapter } = state;

  // Defines local state
  const [commitText, setCommitText] = useState("");
  const [commitType, setCommitType] = useState("Edit");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Defines variable for calling the mutation
  const [addCommit] = useMutation(ADD_COMMIT);

  // Function to handle changes to form inputs
  const handleChange = (evt) => {
    evt.preventDefault();

    const name = evt.target.id;
    const value = evt.target.value;

    if (name === "formCommitText") {
      setCommitText(value);
    } else {
      setCommitType(value);
    }
  };

  // Function to run the mutation
  const submitCommit = async () => {
    // Run the mutation only if there is some text for the commit
    if (commitText) {
      await addCommit({
        variables: {
          chapterId: currentChapter._id,
          title: updatedData.title,
          chapterText: updatedData.chapterText,
          isPublic: updatedData.isPublic,
          commitText,
          commitType,
        },
      });

      document.querySelector("#formCommitText").value = "";
      document.querySelector("#formCommitType").value = "Edit";

      setSuccess(true);

      setTimeout(function () {
        setSuccess(false);
      }, 5000);
    } else {
      setError(true);

      setTimeout(function () {
        setError(false);
      }, 5000);
    }
  };

  // JSX
  return (
    <Form>
      <Form.Group controlId="formCommitText">
        <Form.Label>Commit Description</Form.Label>
        <Form.Control type="text" onChange={handleChange} />
        {!!error && (
          <p style={{ color: "var(--tertiary)" }}>
            Please describe this commit!
          </p>
        )}
      </Form.Group>

      <Form.Group controlId="formCommitType">
        <Form.Label>Commit Type</Form.Label>
        <Form.Control
          as="select"
          name="commit-type"
          defaultValue="Option 1"
          onChange={handleChange}
        >
          <option>Edit</option>
          <option>Suggestion</option>
        </Form.Control>
      </Form.Group>

      {!success ? (
        <Button onClick={submitCommit}>Submit Commit</Button>
      ) : (
        <Button variant="success">Submitted!</Button>
      )}
    </Form>
  );
};

export default CommitForm;
