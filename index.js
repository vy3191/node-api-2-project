const express = require('express');
const postsRouter = require("./routers/posts-router");
const PORT = 5000;

const server = express();


server.use(express.json());
server.use("/api/posts", postsRouter);


server.listen(PORT, (req,res) =>{
  console.log(`Server is up and running at http://localhost:${PORT}`);
})