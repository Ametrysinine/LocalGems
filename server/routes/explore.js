import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
// import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.

// Route to get gems filtered by city and keyword
router.get("/", async (req, res) => {
  const queryCity = req.query.city || '';
  const queryKeyword = req.query.keyword || '';

  let gems = await db.collection('gems');
  let results = [];

  // both city and keyword
  if (queryCity && queryKeyword) {
    results = await gems.find({
      $and: [
        { city: { $regex: queryCity, $options: 'i' } },
        {
          $or: [
            { description: { $regex: queryKeyword, $options: 'i' } },
            { name: { $regex: queryKeyword, $options: 'i' } }
          ]
        }
      ]
    }).toArray();

    //only city
  } else if (queryCity) {
    results = await gems.find({ city: { $regex: queryCity, $options: 'i' } }).toArray();

    //only keyword
  } else if (queryKeyword) {
    results = await gems.find({
      $or: [
        { description: { $regex: queryKeyword, $options: 'i' } },
        { name: { $regex: queryKeyword, $options: 'i' } }
      ]
    }).toArray();
  } else {
    results = await gems.find().toArray();
  }

  res.status(200).json(results);
});

// random route to test regex query
router.get("/izza", async (req, res) => {
  let gems = await db.collection('gems');
  let results = await gems.find({ description: { $regex: 'izza', $options: 'i' } }).toArray();
  res.status(200).json(results);
});

export default router;
