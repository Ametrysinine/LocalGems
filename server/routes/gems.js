import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  const collection = await db.collection("gems");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/posted_gems", async (req, res) => {
  //query users db to find array of posted_gems
  const users = await db.collection('users');
  const currentUser = await users.find({name: "Alex"}).toArray(); //after chris sets up cookies -> change to name of current user
  const ownedIds = currentUser[0].posted_gems; 

  // query gems collection to find gems that match the objectIds 
  const gems = await db.collection('gems');
  const ownedGems = await gems.find({ _id: { $in: ownedIds } }).toArray(); 

  res.json(ownedGems).status(200);
});

router.get("/unlocked_gems", async (req, res) => {
  //query users db to find array of posted_gems
  const users = await db.collection('users');
  const currentUser = await users.find({name: "Alex"}).toArray(); //after chris sets up cookies -> change to name of current user
  const unlockedIds = currentUser[0].unlocked_gems; 

  // query gems collection to find gems that match the objectIds 
  const gems = await db.collection('gems');
  const unlockedGems = await gems.find({ _id: { $in: unlockedIds } }).toArray(); 
  
  res.json(unlockedGems).status(200);
});

router.get("/favourited_gems", async (req, res) => {
  //query users db to find array of posted_gems
  const usersCollection = await db.collection('users');
  const currentUser = await usersCollection.find({name: "Alex"}).toArray(); //after chris sets up cookies -> change to name of current user
  const favouritedIds = currentUser[0].favourited_gems; 
  // if they come out as strings, will need the following line
  // const favouritedObjectIds = favouritedIds.map(id => ObjectId(id));

  // query gems collection to find gems that match the objectIds 
  const gems = await db.collection('gems');
  const favouritedGems = await gems.find({ _id: { $in: favouritedIds } }).toArray(); 
  
  res.json(favouritedGems).status(200);
});

export default router;