import axios from "axios";
import express from "express";

const question = express();

question.get('/getQuestionDetailBySlug/:slug', async (req, res) => {
  try {
    
    const { slug } = req.params;

    let data = JSON.stringify({
      query: `query questionContent($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        content
        mysqlSchemas
      }
    }`,
      variables: {"titleSlug":slug}
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://leetcode.com/graphql/',
      headers: { 
        'Content-Type': 'application/json', 
        // 'Cookie': '__cf_bm=76lLhwaX70HvN1D_2DdVyVmjrywdBCbmV5zHnnRzccU-1715833230-1.0.1.1-qujjir.VXL25207ueCRQNYbUuLpK0wYxZdYFKaCvcRnO0EWgmtEDALz.OsNLtwPYg75Ut3wvf9_BtUhyOnS9CA; csrftoken=UV0wIzQw7mOLe6CXp2kACXCPofDOqwC8gukqv8X8SRavBq3ux1tVyEkrHDHY4KzM'
      },
      data : data
    };

    let details = "";

    axios.request(config)
    .then((response) => {
      details = JSON.stringify(response.data.data.question.content);
      // details = parseDetails(details);
      // console.log(details, "done detail");
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