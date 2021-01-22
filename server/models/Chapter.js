const { Schema } = require("mongoose");
const commentSchema = require("./Comment");
const commitSchema = require("./Commit");
const dateFormat = require("../utils/dateFormat");

const chapterSchema = new Schema(
  {
    author: {
      type: String,
      required: "You need to be logged in to write a chapter",
    },
    title: {
      type: String,
      required: "You need a title for this work",
    },
    chapterText: {
      type: String,
      required: "You need to write something!",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
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
    ], //once a collaborator makes an edit to a specific chapter they will be added for credit.
    comments: [commentSchema],
    commits: [commitSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

chapterSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});
chapterSchema.virtual("commitCount").get(function () {
  return this.commits.length;
});

module.exports = chapterSchema;
