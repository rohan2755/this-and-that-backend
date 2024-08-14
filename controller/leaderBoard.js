const User  =  require("../Models/User")

async function leaderBoard(req,res){
    try{
        const totalScore = await User.find().sort({ score: -1, totalTime: 1 });

        res.json({
            message : "Leader Board ",
            data : totalScore,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = leaderBoard