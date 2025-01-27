import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import {  Decimal128, ObjectId } from "mongodb";

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.




// Favourite a gem----------------------------------------------------------------------------------------
router.post("/favourite/:gem_id", async (req, res) => {
  console.log("-----correct path to favourite!-----");

  const collection = await db.collection("users");
  // const userId = req.params.user_id; // aLZ3b1
  const userId = req.body.user_id;
  const gemId = req.params.gem_id 
  res.status(200).send(await collection.findOneAndUpdate({ user_id: userId }, { $addToSet: { favourited_gems: gemId } }));
});


// Gem is already bought, just unlocking
router.post("/unlock_gem/:gem_id/", async (req, res) => {  
  console.log(`\nEntered the POST Currency route with the following data:\n`, req.body);
  const collection = await db.collection("users");
  const userId = req.body.user_id;

  const gemId = req.params.gem_id 

  res.status(200).send(await collection.findOneAndUpdate({ user_id: userId }, { $addToSet: { unlocked_gems: gemId } }));
});

// Retrieve all gems when no filter is applied------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  const collection = await db.collection("gems");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Retrieve gems for posted_gems----------------------------------------------------------------------------------------
router.get("/posted_gems", async (req, res) => {
  const userIDToSendToDBSuperImportant = req.query.user;

  const gems = await db.collection('gems');
  const filteredGems = await gems.find({ owner_id: userIDToSendToDBSuperImportant }).sort({ date_shared: -1 }).toArray();

  res.json(filteredGems).status(200);
});



// Retrieve gems based on user_id for favourited and unlocked----------------------------------------------------------------
router.get("/:filter", async (req, res) => {
  // console.log("Entered /:filter");

  const filter = req.params.filter;
  const userIDToSendToDBSuperImportant = req.query.user;
  // console.log(`Our userIDToSendToDBSuperImportant is: `, userIDToSendToDBSuperImportant);

  const users = await db.collection('users');
  const currentUser = await users.find({ user_id: userIDToSendToDBSuperImportant }).toArray();
  // console.log("currentUser: ", currentUser);

  let filteredGemIds = [];
  if (filter === 'favourited_gems') {
    filteredGemIds = currentUser[0].favourited_gems;
  } else if (filter === 'unlocked_gems') {
    filteredGemIds = currentUser[0].unlocked_gems;
  }
  // console.log("filter: ", filter, "filtered gem ids (strings now): ", filteredGemIds);

  const gems = await db.collection('gems');
  const filteredGems = await gems.find({ gem_id: { $in: filteredGemIds } }).toArray();
  // console.log("filteredGems: ", filteredGems);


  res.json(filteredGems).status(200);
});



// This will create a new Gem in the db--------------------------------------------------------------------------------
router.post('/create', async (req, res) => {
  function createRandId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 6;
    let randId = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randId += characters[randomIndex];
    }
    return randId;
  }

  const gems = await db.collection("gems");

  const { name, description, city, address, latitude, longitude, images, tags, whats_great_about_it, type } = req.body;
  const userId = req.query.userId;
  const userName = req.query.username;

  // Safe to delete
  // const latDecimal = Decimal128.fromString(latitude);
  // const longDecimal = Decimal128.fromString(longitude);

  const newGem = {
    _id: new ObjectId(),
    name,
    description,
    city,
    location: {
      address,
      latitude: Decimal128.fromString(latitude),
      longitude: Decimal128.fromString(longitude)
    },
    date_shared: new Date(),
    images: images,
    total_score: 0,
    owner_id: userId,
    type,
    tags: tags,
    whats_great_about_it,
    created_by: userName,
    gem_id: createRandId()
  };

  console.log("NEW GEM: ", newGem);
  

  try {
    const result = await gems.insertOne(newGem);
    res.json(result).status(200);

  } catch (error) {
    console.error('Failed to create gem:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// This will delete a Gem in the db using its _id-------------------------------------------------------------------
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const gems = await db.collection('gems');
    const result = await gems.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Gem successfully deleted' });
    } else {
      res.status(404).json({ message: 'Gem not found' });
    }
  } catch (error) {
    console.error('Failed to delete gem:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;