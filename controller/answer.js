const Event = require('../Models/Events')

async function answer(req,res){
    const{questionId , updatedAnswer} = req.body;
    try{
        const updatedQuestion = await Event.findByIdAndUpdate(
            questionId,                     // The ID of the document to update
            { correctAns: updatedAnswer },   // The update to be applied
            { new: true }                    // Options: { new: true } returns the updated document
          );
        
          if (updatedQuestion) {
            res.status(200).json({ message: 'Answer updated successfully', updatedQuestion });
          } else {
            res.status(404).json({ message: 'Question not found' });
          }
    }catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = answer