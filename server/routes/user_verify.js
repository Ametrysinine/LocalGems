import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.
import * as dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_KEY

import jwt from "jsonwebtoken";
import validateToken from "../middleware/validateToken.js";

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// Used for posting data to server from the login form
router.get("/", async (req, res) => {  
  console.log(`succesful GET to user-verify route`);

  
});


export default router;