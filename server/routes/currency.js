import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";

const router = express.Router();


//for fetching our gem count from DB
router.get("/", async (req, res) => {
  console.log(`\nEntered the GET currency route`);
  console.log('REQ ' + req.query);
  // import user_id from query params
  const userId = req.query.user;
  console.log(`Our userId is: `, userId);
  
  // query the users collections to find
  const collection = await db.collection("users");
  const currentUser = await collection.find({user_id: userId}).toArray();

  // find currency object
  const currency = currentUser[0].currency;
  // loop over object to display values

  console.log(`Our currency is: `, currency);
  res.send(currency).status(200);
});


//For updating our currency in DB when we create a gem
router.post("/create_gem", async (req, res) => {  
  console.log(`\nEntered the POST Currency route with the following data:\n`, req.body);


});


//For updating our currency in DB when we create a gem
router.post("/unlock_gem", async (req, res) => {  
  console.log(`\nEntered the POST Currency route with the following data:\n`, req.body);


});

export default router;