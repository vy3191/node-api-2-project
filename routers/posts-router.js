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
     const post = await db.findById(id);
     if(!post) res.status(404).json({message:`There are no posts with the ${id}`});
     res.json(post);
  } catch(err) {
     res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

router.post("/", async (req,res) => {
  try {
     const {title,contents} = req.body;
     if(!title || !contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
     const response = await db.insert(req.body);
     if(response.id) {
        return res.status(201).json(await db.findById(response.id));
     }     
  } catch(err) {
     res.status(500).json({ error: "The posts information could not be retrieved." });
  }
})


module.exports = router;