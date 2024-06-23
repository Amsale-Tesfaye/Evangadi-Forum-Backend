
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
// const { v4: uuidv4 } = require("uuid");

   //post answerQuestion
   async function postAnswer(req, res) {
    const { userid } = req.user;
     const { answer } = req.body;
        //generating a unique id
    //  const answerid = uuidv4();

     if ( !answer ) {
     
       return res
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: "please provide all required fields!" });
     }
     try {
       const questionid = req.params.questionid;
        await dbConnection.query(
         "INSERT INTO answers ( userid, questionid, answer) VALUES (?,?,?)",
         [ userid, questionid, answer]
       );

       return res
         .status(StatusCodes.OK)
         .json({ msg: "Your question get an answer sucessfully" });

     } catch (error) {
       console.log(error.message);
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ msg: "something went wrong, try again!" });
     }
   };

//get all answers Page//
async function getAllAnswers(req, res) {
   const { questionid } = req.params;
  try {
    const [answers] = await dbConnection.query(
      "SELECT answers.answer , users.username FROM answers INNER JOIN users ON answers.userid = users.userid WHERE questionid =?", [questionid]
    );

            //********* */
    return res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again!" });
  }
}
//get detail questions and answer page//
async function getDetailAnswers(req, res) {
  const { userid, questionid, answer} = req.body;
  const { answerid } = req.params;

  try {
    const [answer] = await dbConnection.query(
      "select answerid, userid, questionid, answer from answers"
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "answer imported sucessfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again!" });
  }
}

    

module.exports = { postAnswer, getAllAnswers, getDetailAnswers };





// const answerQuestion = async (req, res) => {
//   const { id } = req.params;
//   const { username, text } = req.body;

//   try {
//     const question = await Question.findById(id);
//     question.answers.push({ username, text });
//     await question.save();
//     res.status(201).json(question);
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
