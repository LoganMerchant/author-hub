import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/react-hooks";

import { ADD_COMMIT } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";

const CommitForm = ({ updatedTitle, updatedText, updatedIsPublic }) => {
  // Gets currentChapter from global store
  const [state] = useStoreContext();
  const { currentChapter } = state;

  // Defines local state
  const [commitText, setCommitText] = useState("");
  const [commitType, setCommitType] = useState("Option 1");

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
    // Run the mutation and get the updated chapter back
    await addCommit({
      variables: {
        chapterId: currentChapter._id,
        title: updatedTitle,
        chapterText: updatedText,
        isPublic: updatedIsPublic,
        commitText,
        commitType,
      },
    });

    document.querySelector("#formCommitText").value = "";
    document.querySelector("#formCommitType").value = "Option 1";
  };

  // JSX
  return (
    <Form>
      <Form.Group controlId="formCommitText">
        <Form.Label>Commit Description</Form.Label>
        <Form.Control type="text" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formCommitType">
        <Form.Label>Commit Type</Form.Label>
        <Form.Control
          as="select"
          name="commit-type"
          defaultValue="Option 1"
          onChange={handleChange}
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </Form.Control>
      </Form.Group>

      <Button onClick={submitCommit}>Commit Changes!</Button>
    </Form>
  );
};

export default CommitForm;
