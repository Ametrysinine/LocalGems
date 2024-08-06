import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.


// Retrieve all gems when no filter is applied------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  const collection = await db.collection("gems");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Retrieve gems for posted_gems----------------------------------------------------------------------------------------
router.get("/posted_gems", async (req, res) => {
  console.log("-----correct path to posted_gems!-----");
  
  const userIDToSendToDBSuperImportant = req.query.user;
  console.log(`Our userIDToSendToDBSuperImportant is: `, userIDToSendToDBSuperImportant);
  
  const gems = await db.collection('gems');
  const filteredGems = await gems.find({ owner_id: userIDToSendToDBSuperImportant }).sort({ date_shared: -1 }).toArray(); 
  
  console.log("filtered gems: ", filteredGems);
  res.json(filteredGems).status(200);
});

// Retrieve gems based on user_id for favourited and unlocked----------------------------------------------------------------
router.get("/:filter", async (req, res) => {
  const filter = req.params.filter;
  const userIDToSendToDBSuperImportant = req.query.user;
  // console.log(`Our userIDToSendToDBSuperImportant is: `, userIDToSendToDBSuperImportant);

  const users = await db.collection('users');
  const currentUser = await users.find({user_id: userIDToSendToDBSuperImportant}).toArray();
  // console.log("currentUser: ", currentUser);

  let filteredGemIds = [];
    if (filter === 'favourited_gems') {
      filteredGemIds = currentUser[0].favourited_gems;
    } else if (filter === 'unlocked_gems') {
      filteredGemIds = currentUser[0].unlocked_gems;
    }
    // console.log("filter: ", filter, "filtered gem ids: ", filteredGemIds);

  const gems = await db.collection('gems');
  const filteredGems = await gems.find({ _id: { $in: filteredGemIds } }).toArray(); 
  
  res.json(filteredGems).status(200);
});

// This will create a new Gem in the db--------------------------------------------------------------------------------
router.post('/create', async (req, res) => {
  const gems = await db.collection("gems");
  
  const { name, description, city, address, latitude, longitude, images, type } = req.body;
  const userId = req.query.user_id;
  console.log("userid: ", userId);

  const newGem = {
    _id: new ObjectId(),
    name,
    description,
    city,
    location: {
      address,
      latitude,
      longitude
    },
    images: images.split(',').map((image) => image.trim()),
    type,
    createdAt: new Date(),
    total_score: 0,
    owner_id: userId
  };

  try {
    const result = await gems.insertOne(newGem);
    res.json(result).status(200);
    console.log("restult: ", result);
    
  } catch (error) {
    console.error('Failed to create gem:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;