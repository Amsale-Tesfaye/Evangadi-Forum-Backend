const express = require("express");
const router = express.Router();
// authentication middleware
const authMiddleware = require('../middleware/authMiddleware')


//answers controllers
const { postAnswer, getAllAnswers, getDetailAnswers,
} = require("../controller/answerController");

// //post answer route
router.post("/post-answer/:questionid", postAnswer);

//get all answers route
router.get("/get-all-answers/:questionid", getAllAnswers);

//get detail questions route
router.get("/get-detail-answers", getDetailAnswers);

module.exports = router;