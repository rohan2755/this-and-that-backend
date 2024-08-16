const Event = require('../Models/Events');
const User = require('../Models/User')

async function uploadQuestion(req,res){
    const questions = await Event.find()
    const{data} = req.body;
    console.log(data)
    try{
        await User.deleteMany({})
        for(const questionData of data){
            const {_id, question , correctAns, options } = questionData;
            await Event.findOneAndUpdate(
                { _id },
                {
                    question,
                    options,
                    correctAns,
                },
                { new: true, upsert: true } // `upsert: true` creates a new question if it doesn't exist
            );
        }
        console.log("submitted updated questions")
        res.status(200).json({ message: 'Questions updated successfully!' });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = uploadQuestion