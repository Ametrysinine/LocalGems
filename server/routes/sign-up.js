import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// Renders the sign-up page
router.get("/", async (req, res) => {
  
  
});


// Used for posting data to server from the sign-up form
router.post("/", async (req, res) => { // POST to sign-up/
  let users = await db.collection('users');
  console.log(req.body)
  let emailTaken = await users.findOne({email: req.body.email})
  
  if (emailTaken) { //Check for duplicate email
    console.log(`user exists: ${req.body.email}`)
    res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }

  // else: give user JWT, write to DB
  
});


export default router;