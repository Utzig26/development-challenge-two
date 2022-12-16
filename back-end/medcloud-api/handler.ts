
import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());

app.get("/patients",(req, res) => {
  res
    .json("Hello patients!")
    .status(200);
});

export const handler = serverless(app);
