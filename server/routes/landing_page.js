import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// Renders the landing page, passes in any vars relating to user to display on the nav
router.get("/", (req, res) => {
  console.log('\nEntered GET route for landing pg in landing_page.js via router');  
  res.status(200).send({hello: 'welcome from router'});
});


export default router;