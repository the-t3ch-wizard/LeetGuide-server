import express from "express";
import question from "./question/question.js";
import answer from "./answer/answer.js";
import chat from "./chat/chat.js";

const v1 = express();
v1.use('/question', question)
v1.use('/answer', answer)
v1.use('/chat', chat)

export default v1;