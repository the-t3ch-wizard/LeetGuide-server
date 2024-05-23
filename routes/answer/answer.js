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
              "text": `Act as a DSA mentor and provide me 3 hints about question and its details are as follows ${questionDetails.details}. Provide 3 hints which range from a little bit understanding to full understanding . The first hint should help a little , the second one should help more and the third one should help very much. Strictly follow the given template and do not answer in markdown.
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
    .then( async (response) => {
      console.log(response.data.candidates[0].content.parts[0].text);
      if (response.data.candidates[0].content.parts[0].text){
        const allHints = await JSON.parse(response.data.candidates[0].content.parts[0].text);
        hints.push(allHints.hint1)
        hints.push(allHints.hint2)
        hints.push(allHints.hint3)
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        "data": "Unable to provide the hints"
      })
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
              "text": `Act as a DSA mentor and provide me answer for following question ${questionDetails.details}. Provide 2 answers brute force answer and optimal answer. The first answer should be brute force and the second one should be the most optimal solution. Answer in detail and provide the code in java.`
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

    let answer = "";
    
    axios.request(config)
    .then( async (response) => {
      if (response.data.candidates[0].content.parts[0].text){
        answer = await response.data.candidates[0].content.parts[0].text
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        "data": "Unable to provide the answers"
      })
    })
    .finally(() => {
      return res.send(answer);
    })

  } catch (error) {
    console.log(error);
    return res.json({
      "data": "Unable to provide the answers"
    })
  }
})

export default answer;