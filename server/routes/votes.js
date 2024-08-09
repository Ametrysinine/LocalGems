import express from "express";
import db from "../db/connection.js";     // This will help us connect to the database
import { ObjectId } from "mongodb";

// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router(); 

router.post("/:gem_id/:action/", async (req, res) => {
  const collection = await db.collection("gems");
  // const userId = req.params.user_id; // aLZ3b1
  const userId = req.body.user_id;
  const gemId = req.params.gem_id; // 66a1b22ccc7c0aa29f04a9ee
  const action = req.params.action; // EITHER: "upvote" or "downvote"

  if (action !==  "upvote" && action !==  "downvote") {
    res.status(401).send("Unauthorized action");
  }

  res.status(200).send(await collection.findOneAndUpdate({gem_id: gemId}, {$addToSet: {[`${action}_users`]: userId}}, {upsert: true}));
});

export default router;