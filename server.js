const express = require('express')
const cors = require('cors')
// const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./Config/ConfigDB')
const router = require('./routes/index')
const Event = require('./Models/Events')

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
// app.use(cookieParser())

app.use("/api",router)

const PORT = 8000 || process.env.PORT

const events = [
    {
        question : 'Will Southern Brave win the match ?',
        correctAns : 'Yes'

    },
    {
        question : 'Will Welsh Fire hit more boundaries ?',
        correctAns : 'Yes'
    },
    {
        question : 'Will Alex Davis score more runs than Stephen Eskinazi ?',
        correctAns : 'Yes'
    },
    {
        question : 'Will Like Wood concede more runs than David Wiley ?',
        correctAns : 'Yes'
    },
    {
        question : 'Will Southern Brave score 25 runs faster than Welsh Fire',
        correctAns : 'Yes'
    }
]


// const questions = await Event.find();
// console.log("questions length ",questions.length, "questions ",questions)
// async function seedDB(){
//     if(questions){

//         await Event.insertMany(events)
//     }
// }

// seedDB()

//     events.forEach(async (event) => {
//         await Event.updateOne(
//             { question: event.question }, // Filter to find the question
//             { $set: { correctAns: event.correctAns } } // Update the correctAns field
//         )
//         .then(result => {
//             console.log(`Updated question: ${event.question}`);
//         })
//         .catch(error => {
//             console.error(`Error updating question: ${event.question}`, error);
//         });
//     });
//     console.log('Events Seeded')




// connectDB().then(()=>{
//     app.listen(PORT,()=>{
//         console.log("connnect to DB")
//         console.log("Server is running "+PORT)
//     })
// })

async function seedDB() {
    const questions = await Event.find(); // Await the promise
    console.log("Questions length: ", questions.length, "Questions: ", questions);

    if (questions.length === 0) {
        await Event.insertMany(events);
    }

    events.forEach(async (event) => {
        await Event.updateOne(
            { question: event.question }, // Filter to find the question
            { $set: { correctAns: event.correctAns } } // Update the correctAns field
        )
        .then(result => {
            console.log(`Updated question: ${event.question}`);
        })
        .catch(error => {
            console.error(`Error updating question: ${event.question}`, error);
        });
    });

    console.log('Events Seeded');
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
        seedDB(); // Call seedDB after the server is running
    });
});