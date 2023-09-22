const router = require("express").Router();
const User = require("../models/User.model");
const Post = require("../models/EventPost.model");

// CREATE

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// UPDATE

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   DELETE

router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json("Post not found");
      }
  
      if (post.username === req.body.username) {
        try {
          await Post.findByIdAndDelete(req.params.id);;
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err.message);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  
//   GET POST

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL POSTS

router.get("/", async (req, res) => {
  const username = req.query.user;
  const venueName = req.query.venue;
  const edate = req.query.edate; 

  try {
    let posts;
    // Filter by venue
    if (username) {
      posts = await Post.find({ username });
    } else if (venueName) {
      posts = await Post.find({
        venue: {
          $in: [venueName],
        },
      });
    } else if (edate) {
      // Check for the edate query parameter
      posts = await Post.find({ edate }); // Filter by edate
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
