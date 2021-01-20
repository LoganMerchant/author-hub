const { Schema } = require('mongoose');

const chapterSchema = new Schema({
    userId: {
        type: ID,
        required: "You are not logged in, so you cannot upvote! Sorry..."
    }
}
);

module.exports = chapterSchema;