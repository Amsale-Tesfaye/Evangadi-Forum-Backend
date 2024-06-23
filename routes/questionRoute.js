const express = require("express");
const router = express.Router()
//authentication middleware
const authMiddleware = require('../middleware/authMiddleware')



//questions controllers
const {
  postQuestion, getAllQuestions, getDetailQuestions,
} = require("../controller/questionController");

// //postQuestion route
 router.post("/post-question", postQuestion);

//get all questions route
router.get("/get-all-questions", getAllQuestions);

//get detail questions route

router.get("/get-detail-questions/:questionid", getDetailQuestions);





module.exports = router;


























// const express = require("express");
// const {
//   getQuestions,
//   askQuestion,
//   getQuestionById,
//   answerQuestion,
// } = require("../controllers/questionController");
// const router = express.Router();

// router.get("/", getQuestions);
// router.post("/", askQuestion);
// router.get("/:id", getQuestionById);
// router.post("/:id/answers", answerQuestion);

// module.exports = router;