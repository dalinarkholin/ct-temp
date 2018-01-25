import * as express from "express";

const controllers = express.Router();

// Testing Route
controllers.get("/hello", (req: any, res: any) => {
  res.json("Hello World")
})


export default controllers;