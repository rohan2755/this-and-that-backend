const express = require('express');

const router = express.Router();

const userSignUpController = require("../controller/userSignUp")
const getEvents = require("../controller/getEvents")
const submit = require("../controller/submit")
const leaderBoard = require("../controller/leaderBoard")
const getResult = require("../controller/getResult")
const updateAnswer = require("../controller/answer")
const uploadQuestion = require("../controller/uploadQuestions")

router.post("/signup",userSignUpController)
router.get("/fetch",getEvents)
router.post("/submit",submit)
router.get("/board",leaderBoard)
router.post("/result",getResult)
router.post("/answer",updateAnswer)
router.post("/form",uploadQuestion)

module.exports = router