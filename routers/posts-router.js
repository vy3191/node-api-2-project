const express = require('express');
const db = require("../data/db");
const router = express.Router();

router.get("/", async (req,res) => {
    try {
       const posts = await db.find();
       if(posts.length === 0) res.status(404).json({msg:'There are no posts'});
       res.json(posts);
    } catch(err) {
       res.status(500).json({msg:err});
    }
})


module.exports = router;