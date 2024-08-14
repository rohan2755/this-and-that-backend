const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    number: {
        type: Number,
        // required: true,
        // unique: true,
        // match: /^[0-9]{1,10}$/
    },
    userAns: [
        {
            questionId : {
                type : String
            },
            ans : {
                type : String
            }
        }
    ],
    score:{
        type: Number,
        default : 0
        
    },
    totalTime:{
        type : Number,
        default : 0
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User