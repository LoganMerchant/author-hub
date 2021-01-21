const { Schema } = require("mongoose");

const chapterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: "You are not logged in, so you cannot upvote! Sorry...",
  },
});

module.exports = chapterSchema;
