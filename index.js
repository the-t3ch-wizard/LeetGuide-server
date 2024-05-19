import express from "express";
import cors from "cors";
import v1 from "./routes/v1.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.json({
    "data": "Server is running"
  })
})

app.listen(3000, () => {
  console.log("server running");
})

app.use('/api/v1', v1);