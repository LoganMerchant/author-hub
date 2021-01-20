const { Schema } = require('mongoose');
const commentSchema = require('./Comment');
const commitSchema = require('./Commit');
const dateFormat = require('../utils/dateFormat');

const chapterSchema = new Schema(
    {
        chapterText: {
            type: String,
            required: 'You need to write something!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        authorName: {
            type: String,
            required: true
        },
        collaborators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ], //once a collaborator makes an edit to a specific chapter they will be added for credit.
        comments: [commentSchema],
        commits: [commitSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

chapterSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});
chapterSchema.virtual('commitCount').get(function () {
    return this.commits.length;
})

module.exports = chapterSchema;