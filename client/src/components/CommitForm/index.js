import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/react-hooks";

import { ADD_COMMIT } from "../../utils/mutations";
import { UPDATE_CURRENT_CHAPTER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

const CommitForm = ({ updatedChapter }) => {
  // Gets currentChapter from global store
  const [state, dispatch] = useStoreContext();
  const { currentChapter } = state;

  // Defines variable for calling the mutation
  const [addCommit] = useMutation(ADD_COMMIT);

  // Function to run the mutation
  const submitCommit = async (evt) => {
    evt.preventDefault();

    const commitText = document.querySelector("#formCommitText").value;
    const commitType = document.querySelector("#formCommitType").value;

    // Run the mutation and get the updated chapter back
    const response = await addCommit({
      variables: {
        chapterId: currentChapter._id,
        title: updatedChapter.title,
        chapterText: updatedChapter.chapterText,
        isPublic: updatedChapter.isPublic,
        commitText,
        commitType,
      },
    });

    // Update the global store with the updated chapter
    if (response) {
      dispatch({
        type: UPDATE_CURRENT_CHAPTER,
        currentChapter: response,
      });
    }
  };

  // JSX
  return (
    <Form>
      <Form.Group controlId="formCommitText">
        <Form.Label>Commit Description</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group controlId="formCommitType">
        <Form.Label>Commit Type</Form.Label>
        <Form.Control as="select" name="commit-type">
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
