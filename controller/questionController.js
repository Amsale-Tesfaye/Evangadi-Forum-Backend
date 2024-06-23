const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");


        //post your question with description/Single question page//

async function postQuestion(req, res) {
   const { title, description, tag } = req.body;
   const { userid }  = req.user
   //generating a unique id
   const questionid = uuidv4();

  if (!title || !description ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required fields!" });
  } 
  try {
    
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description ) value (?,?,?,?)",
      [questionid, userid, title, description ]
    );

      return res
        .status(StatusCodes.OK)
        .json({ msg: "Your question posted sucessfully" });  
 
  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, try again!" })
  }}

         //getAllQuestionsPage//
async function getAllQuestions(req, res) {
  
  try {
    
    const [question] =
      await dbConnection.query(`SELECT questions.*, users.username FROM questions
     JOIN users on questions.userid= users.userid
     ORDER BY questions.id desc
      `)
    // const [question] = await dbConnection.query("select title, description from questions")

    return res.status(StatusCodes.OK).json(question);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again!" });
  }}

     //get detail questions and answer page//
async function getDetailQuestions(req, res) {

   const { questionid } = req.params;

  try {
     const [question] = await dbConnection.query(
       //  (
       //    `SELECT questions.*,users.username FROM questions
       //    JOIN users on questions.userid= users.userid
       //    WHERE questionid = ?
       //  ORDER BY questions.id desc
       //   `,
       //    [questionid]
       //  );
       "SELECT title, description from questions where questionid = ?  ",
       [questionid]
     );

      return res
        .status(StatusCodes.OK)
        .json(question);  
 
  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, try again!" })
  }}

    

module.exports = { postQuestion, getAllQuestions, getDetailQuestions };










