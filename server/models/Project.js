const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const chapterSchema = require('./Chapter');
const voteSchema = require('./Vote');
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema(
    {
        genre: {
            type: String,
            required: 'Please Choose A Genre'
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
        ],
        collabsToAddOrDenyList: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        chapters: [chapterSchema],
        upvotes: [voteSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

projectSchema.virtual('chapterCount').get(function () {
    return this.reactions.length;
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
