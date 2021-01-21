const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const chapterSchema = require("./Chapter");
const voteSchema = require("./Vote");
const dateFormat = require("../utils/dateFormat");
const collabToBeSchema = require("./CollabToBe");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: "Please give this project a title.",
    },
    summary: {
      type: String,
      required: "Please give a summary of your work.",
    },
    genre: {
      type: String,
      required: "Please choose a genre.",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    authorName: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    collabsToAddOrDenyList: [collabToBeSchema],
    chapters: [chapterSchema],
    upvotes: [voteSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

projectSchema.virtual("chapterCount").get(function () {
  return this.reactions.length;
});

projectSchema.virtual("upvoteCount").get(function () {
  return this.upvotes.length;
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
