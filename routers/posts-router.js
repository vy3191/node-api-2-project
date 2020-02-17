const express = require('express');
const db = require("../data/db");
const router = express.Router();

router.get("/", async (req,res) => {
    try {
       const posts = await db.find();
       if(posts.length === 0) res.status(404).json({msg:'There are no posts'});
       res.json(posts);
    } catch(err) {
       res.status(500).json({ error: "The posts information could not be retrieved." });
    }
})

router.get("/:id", async (req,res) => {
  try {
     const id = req.params.id;
     const post = await db.find(id);
     if(!posts) res.status(404).json({message:`There are no posts with the ${id}`);
     res.json(post);
  } catch(err) {
     res.status(500).json({ error: "The posts information could not be retrieved." });
  }
})


module.exports = router;