const Event = require("../Models/Events");
const User = require("../Models/User")

async function result(req, res) {
    try {
        const users = await User.find()
        const questions = await Event.find()

        console.log(questions)


        console.log("inside result controller")

        for (let user of users) {
            let score = 0;
            console.log("user -----", user)
            for (let userAnswer of user.userAns) {
                console.log("inside userAns and ", userAnswer)
                // const question = await Event.findById(userAnswer.questionId);
                const question = questions.filter(p => p._id == userAnswer.questionId)
                console.log("question detail ", question)
                console.log("userAnswer.ans = ", userAnswer.ans, "question.correctAns = ", question[0].correctAns)
                if (question && userAnswer.ans == question[0].correctAns) {
                    score += 1;
                    console.log("score ", score)
                }

            }
            user.score = score;
            await user.save();

        }
        res.json({
            message: "Users Saved",
            data: users,
            success: true,
            error: false
        });

        console.log("after for")
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = result