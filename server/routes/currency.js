import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.JWT_KEY
import jwt from "jsonwebtoken";
import validateToken from "../middleware/validateToken.js";

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

// router.post("/addbethruby", async (req, res) => {  
//   console.log(`\nEntered the POST Currency/addbethruby route with the following data:\n`, req.body);

//   const collection = await db.collection("users");

//   // Increment rubies by 1, change 1 to -1 to decrement
//   collection.findOneAndUpdate({user_id: 'bE2hP0'}, {$inc:{"currency.rubies": 1}});

// });


router.post("/:user/:key/:amount", async (req, res) => {  // Template code to increment/decrement X for Y user
  // Example routes:
    // POST localhost:5050/currency/bE2hP0/sapphires/1
    // POST localhost:5050/currency/aLZ3b1/topazs/-1

  const collection = await db.collection("users");

  const userId = req.params.user;
  const key = req.params.key;
  const amount = Number(req.params.amount);

  const searchString = `currency.${key}`;

  const user = await collection.findOne({user_id: userId});
  const hasCurrency = await (user.currency[key] > 0);

  if (amount < 0 && !hasCurrency) { // Check to ensure not going negative
    res.status(401).json({ message: `Not enough ${key} for transaction`})
  }

  await collection.findOneAndUpdate({user_id: userId}, {$inc: {[searchString]: amount}}, {returnNewDocument: true})
  
  res.send(await user.currency).status(200);
});




//For updating our currency in DB when we create a gem
router.post("/unlock_gem", async (req, res) => {  
  console.log(`\nEntered the POST Currency route with the following data:\n`, req.body);


});

export default router;