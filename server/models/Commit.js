const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commitSchema = new Schema(
    {
        commitText: {
            type: String,
            required: 'You need to write something!',
            minlength: 1,
            maxlength: 280
        },
        commitType: {
            type: String,
            required: 'Please enter the type of commit? Edit, Comment/Cirtique?',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = commitSchema;