import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CommentForm = ({ chapterId }) => {
    //state and variables gained through alternate means other than quieries
    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const username = Auth.getProfile().data.username;
    //Mutations
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    //query based variables



    //Functions
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // add comment to database
            await addComment({
                variables: { chapterId: chapterId, commentText: commentText, username: username }
            });

            // clear form value
            setText('');
            setCharacterCount(0);
            window.location.assign(`/readchapter/${chapterId}`);
        } catch (e) {
            console.error(e);
        }
    };

    //Returned HTML
    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
  {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new comment..."
                    value={commentText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
        </button>
            </form>
        </div>
    );
};

export default CommentForm;