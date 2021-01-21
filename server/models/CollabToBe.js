const mongoose = require('mongoose');
const { Schema } = mongoose;

const collabToBeSchema = new Schema(
    {
        collabId: {
            type: ID,
            required: "You need to be logged in to be able to submit a collaberation request."
        },
        reasonText: {
            type: String,
            required: "You need to give a reason as to why you wish to collab with this author on this project.",
            minlength: 1,
            maxlength: 280
        },
        collabType: {
            type: String,
            required: "What help are you going to offer? Please select a type."
        }
    }
)
module.exports = collabToBeSchema;