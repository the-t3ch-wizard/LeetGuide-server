import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const answer = express();

const apiKey = process.env.API_KEY;

answer.post('/getHintsByDetails', async (req, res) => {
  try {

    const questionDetails = req.body;
    
    let data = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": `Act as a DSA mentor and provide me 3 hints about question and its details are as follows ${questionDetails.details}. Strictly follow the given template and do not answer in markdown. Provide 3 hints which range from a little bit understanding to full understanding . The first hint should help a little , the second one should help more and the third one should help very much. Always provide hints in laymen terms   Provide detailed response
              {
                "hint1":"",
                "hint2":"",
                "hint3":""
              }`
            }
          ]
        }
      ]
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    let hints = [];
    
    axios.request(config)
    .then((response) => {
      if (response.data.candidates[0]){
        const allHints = JSON.parse(response.data.candidates[0].content.parts[0].text);
        hints.push(allHints.hint1)
        hints.push(allHints.hint2)
        hints.push(allHints.hint3)
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      console.log(error);
      throw Error;
    })
    .finally(() => {
      return res.json({
        "data": hints
      })
    })

  } catch (error) {
    console.log(error);
    return res.json({
      "data": "Unable to provide the hints"
    })
  }
})

answer.post('/getAnswerByDetails', async (req, res) => {
  try {

    const questionDetails = req.body;
    
    let data = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": `Provide me the answer for following DSA problem ${questionDetails.details}. Provide detailed answer along with java code. Answer from brute force approach to optimal approach. Strictly format the output as json`
            }
          ]
        }
      ]
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    let ans = "";
    
    axios.request(config)
    .then((response) => {
      // console.log(response);
      const answer = response.data.candidates[0].content.parts[0].text;
      ans = JSON.stringify(answer);
      // console.log(ans);
    })
    .catch((error) => {
      console.log(error);
      throw Error;
    })
    .finally(() => {
      return res.json({
        "data": ans
      })
    })

  } catch (error) {
    console.log(error);
    return res.json({
      "data": "Unable to provide the hints"
    })
  }
})

export default answer;