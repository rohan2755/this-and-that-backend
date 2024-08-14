const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    question: {
        type:String,
        required: true
    },
    correctAns: {
        type: String,
    }
});

const Event = mongoose.model('Event', userSchema);

module.exports = Event