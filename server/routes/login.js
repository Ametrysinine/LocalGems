import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// Renders the login page
router.get("/", async (req, res) => {
  console.log(`\nEntered the GET login route`);
  res.status(201).send({helloMsg: 'welcome to login'});  
});


// Used for posting data to server from the login form
  router.post("/", async (req, res) => {  
    console.log(`\nEntered the POST login route with the following data:`, req.body);
    const { emailField, passwordField} = req.body;
    console.log(`Our email is: `, emailField);
    console.log(`Our password is: `, passwordField);



});


export default router;