import axios from "axios";
import express from "express";

const question = express();

question.get('/getQuestionDetailBySlug/:slug', async (req, res) => {
  try {
    console.log('get - getQuestionDetailBySlug/:slug');
    const { slug } = req.params;

    let data = JSON.stringify({
      query: `query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          content
          mysqlSchemas
        }
      }`,
      variables: {
        "titleSlug": slug
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://leetcode.com/graphql/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data
    };

    let details = "";

    axios.request(config)
    .then((response) => {
      details = JSON.stringify(response.data.data.question.content);
    })
    .catch((error) => {
      console.log(error);
      throw Error;
    })
    .finally(() => {
      return res.json({
        "data": details
      })
    })

  } catch (error) {
    console.log(error);
    return res.json({
      "data": "Unable to get details"
    })
  }
})



export default question;