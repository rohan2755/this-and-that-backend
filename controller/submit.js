// const User = require('../Models/User');

// async function user(req,res){
//     try{
//         const {userId, timeTaken, ans , questionId} = req.body
//         console.log(userId, "userId")
//         const user = await User.findById(userId);
//         user.totalTime = timeTaken
//         console.log("questionId", questionId)
//         user.userAns.push({questionId , ans}) //user.userAns.push({questionId : id , ans : userAns})
//         await user.save();
//         res.json({
//             message : "User Saved",
//             data : user,
//             success : true,
//             error : false
//         })
//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = user



const User = require('../Models/User');

async function user(req, res) {
    try {
        const { userId, timeTaken, ans, questionId } = req.body;
        console.log(userId, "userId");

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        // Update total time taken
        user.totalTime = timeTaken;

        console.log("questionId", questionId);

        // Check if the questionId already exists in user.userAns
        const existingAnswerIndex = user.userAns.findIndex(
            (answer) => answer.questionId.toString() === questionId
        );

        if (existingAnswerIndex > -1) {
            // Update the existing answer
            return res.status(400).json({
                message: "Already answered",
                success: false,
                error: true,
            });

            // user.userAns[existingAnswerIndex].ans = ans;
        } else {
            // Add new questionId and answer if it doesn't exist
            user.userAns.push({ questionId, ans });
        }

        // Save the updated user document
        await user.save();

        res.json({
            message: "User data updated successfully",
            data: user,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = user;