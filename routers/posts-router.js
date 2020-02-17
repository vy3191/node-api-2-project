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
});

router.put("/:id", async (req,res) => {
  try {
     const {title,contents} = req.body;
     const {id} = req.params;
     if(!title || !contents) res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
     const response = await db.findById(id);
     if( !response.length === 0) res.status(404).json({ message: "The post with the specified ID does not exist." });
     const count  = await db.update(id, req.body);
     if(count > 0) res.status(200).json(count);
        
  } catch(err) {
     res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

router.delete("/:id", async (req,res) => {
  try {    
     const {id} = req.params;     
     const response = await db.findById(id);
     if( response.length === 0 && response[0].id) res.status(404).json({message: "The post with the specified ID does not exist."});
     const count = await db.remove(id);
     if(count > 0) res.status(200).json(response);    
        
  } catch(err) {
     res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

// Requests for comments on posts.
router.get("/:id/comments", async (req,res) => {
   try {
     const id = req.params.id;
     const post = await db.findById(id);
     if(post.length === 0) res.status(404).json({ message: "The post with the specified ID does not exist." });
     res.status(200).json(await db.findPostComments(id));
  } catch(err) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
 }
});


module.exports = router;