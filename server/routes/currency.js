import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

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
  const currentUser = await collection.findOne({user_id: userId});

  // find currency object
  const currency = currentUser.currency;
  // loop over object to display values

  console.log(`Our currency is: `, currency);
  res.send(currency).status(200);
});

//For updating our currency in DB when we create a gem
router.post("/create_gem", async (req, res) => {  
  console.log(`\nEntered the POST Currency route with the following data:\n`, req.body);


});

// Template code to increment/decrement X for Y user
router.post("/:key/:amount", async (req, res) => {  
  // Example routes:     /api/currency/sapphires/1   or    /api/currency/topazs/-1 
  // Make sure to pass in userFromDB from useReducer as part of POST Body + headers
  console.log(`\nEntered route for /currency/:key/:amount`);

  const collection = await db.collection("users");
  console.log('JSON Body from client:', JSON.stringify(req.body))
  // const userId = req.params.user; // aLZ3b1
  const userId = req.body.user_id;
  const key = req.params.key; //"rubies", "sapphires", etc
  const amount = Number(req.params.amount); // 1, -1, 2, -2, etc

  console.log(`Our userId is: `, userId);
  console.log(`Our key is: `, key);
  console.log(`Our amount is datatype: `, typeof amount,`containing:`, amount);

  const searchString = `currency.${key}`;

  const user = await collection.findOne({user_id: userId});
  const hasCurrency = await (user.currency[key] >= -amount)

  if (amount < 0 && !hasCurrency) { // Check to ensure not going negative
    console.log(`Entered IF amount < 0 && !hasCurrency ln 59`);
    // res.send(await user).status(401).json({ message: `Not enough ${key} for transaction`})  //JER     
    res.status(401).json({ message: `Not enough ${key} for transaction`})  //CHR
  }
  else{
    await collection.findOneAndUpdate({user_id: userId}, {$inc: {[searchString]: amount}}, {returnNewDocument: true})    
    res.send(await user);
  }
});


//Chris test route for checking the unlock modal
router.post("/transaction", async (req, res) => {  
  console.log(`\nEntered the POST /Currency/transaction route with the following data:\n`, req.body);

});


//For updating our currency in DB when we create a gem
router.post("/unlock_gem", async (req, res) => {  
  console.log(`\nEntered the POST Currency route with the following data:\n`, req.body);


});

export default router;