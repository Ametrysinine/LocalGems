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
  const users = await db.collection('users');
  const currentUser = await users.find({name: "Alex"}).toArray(); //after chris sets up cookies -> change to name of current user
  const ownedIds = currentUser[0].posted_gems; 

  const gemsCollection = await db.collection('gems');
  // this will be the list of all gems corresponding to the gem objectIDs
  const ownedGems = await gemsCollection.find({ _id: { $in: ownedIds } }).toArray(); 

  res.json(ownedGems).status(200); // change this to searching by ID (like favourited_gems)
});

router.get("/unlocked_gems", async (req, res) => {
  const users = await db.collection('users');
  const results = await users.find({name: "Alex"}).toArray(); //after chris sets up cookies -> change to name of current user
  res.json(results[0].unlocked_gems).status(200);
});

router.get("/favourited_gems", async (req, res) => {
  const usersCollection = await db.collection('users');
  const currentUser = await usersCollection.find({name: "Alex"}).toArray(); //after chris sets up cookies -> change to name of current user

  // list of the objectIDs
  const favouritedIds = currentUser[0].favourited_gems; 
  // if they come out as strings, will need the following line
  // const favouritedObjectIds = favouritedIds.map(id => ObjectId(id));

  const gemsCollection = await db.collection('gems');
  // this will be the list of all gems corresponding to the gem objectIDs
  const favouritedGems = await gemsCollection.find({ _id: { $in: favouritedIds } }).toArray(); 
  
  res.json(favouritedGems).status(200);
});

export default router;