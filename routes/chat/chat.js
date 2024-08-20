import axios from "axios";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const chat = express();

chat.post('', async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You will be asked for help in coding problem by a student. Answer as if you were an experienced programming teacher. Always give friendly, chatty answer"
  });

  const data = req.body;
  const result = await model.generateContent({
    contents: data,
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    },
  });
  res.json({
    "data": result.response.text()
  })

})


export default chat;