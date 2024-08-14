const User = require('../Models/User');

async function allEvents(req,res){
    try{
        const allEvents = await User.find()

        res.json({
            message : "All Events ",
            data : allEvents,
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

module.exports = allEvents