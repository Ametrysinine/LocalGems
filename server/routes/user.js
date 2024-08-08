import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import * as dotenv from 'dotenv'
dotenv.config()


// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.

// Route for getting our userObject from database
router.get("/", async (req, res) => {  
  const mongoUserFetchQuery = req.query.user_id;
  console.log(`Our mongoUserFetchQuery in our API/USER route is:`, mongoUserFetchQuery);
  
  const user = await db.collection('users');
  const userOBJ = await user.findOne({ user_id: mongoUserFetchQuery }); 

  console.log(`\n\nOur userOBJ from Mongo query is: `, userOBJ, "\n\n");

  res.json(userOBJ).status(200);
});


export default router;