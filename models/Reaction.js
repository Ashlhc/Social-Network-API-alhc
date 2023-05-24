const mongoose = require('mongoose');

const {Schema} = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 300
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
});

function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

module.exports = reactionSchema;