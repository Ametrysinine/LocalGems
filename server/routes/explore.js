import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
// import { ObjectId } from "mongodb";       // This help convert the id from string to ObjectId for the _id.

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();     // router is an instance of the express router. We use it to define our routes.

// Route to get gems filtered by city and keyword
router.get("/", async (req, res) => {
  const queryCity = req.query.city || '';
  const queryKeyword = req.query.keyword || '';
  const queryType = req.query.type || '';

  let gems = await db.collection('gems');
  let results = [];
  let filters = [];

  // exclude gems owned by the current user
  const loggedInUserId = "a8Z3b1-H9k4L5"; // change this when i get log ins working
  filters.push({ user_id: { $ne: loggedInUserId } });

  if (queryCity) {
    filters.push({ city: { $regex: queryCity, $options: 'i' } });
  }

  if (queryKeyword) {
    filters.push({
      $or: [
        { description: { $regex: queryKeyword, $options: 'i' } },
        { name: { $regex: queryKeyword, $options: 'i' } }
      ]
    });
  }

  if (queryType) {
    filters.push({ type: queryType });
  }

  if (filters.length > 0) {
    results = await gems.find({ $and: filters }).toArray();
  } else {
    results = await gems.find().toArray();
  }
  res.status(200).json(results);
});

export default router;
