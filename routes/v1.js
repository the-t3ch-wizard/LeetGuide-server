import express from "express";
import question from "./question/question.js";
import answer from "./answer/answer.js";

const v1 = express();
v1.use('/question', question)
v1.use('/answer', answer)

export default v1;