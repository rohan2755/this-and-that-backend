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
        question : 'BCC Spartan to have a 1st wicket partnership of 85 or more runs vs CC Akademik - Sofia?',
        correctAns : 'No'

    },
    {
        question : 'Anas Khan to score 20 or more runs vs Global Stars?',
        correctAns : 'No'
    },
    {
        question : 'CC Akademik - Sofia to take 2 or more wickets at the end of 6 overs vs BCC Spartan?',
        correctAns : 'No'
    },
    {
        question : 'Sofia ?',
        correctAns : 'No'
    },
    {
        question : 'BD Lions to have a 5th wicket partnership of 25 or more runs vs Global Stars?',
        correctAns : 'No'
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