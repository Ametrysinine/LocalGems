import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import * as dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_KEY
import jwt from "jsonwebtoken";
import validateToken from "../middleware/validateToken.js";

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.

// Route for checking the validity of our JWT from client
router.post("/", validateToken, (req, res) => {  
  console.log(`succesful POST to user-verify route`);
  console.log("user_verify.js has this for req.userData:\n", req.userData);
  return res.status(200).json(req.userData);  
});


export default router;