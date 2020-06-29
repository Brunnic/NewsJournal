const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const passportConfig = require("../utils/passport");
const Post = require("../models/Post");
// const imageExists = require("image-exists");
const fetch = require("node-fetch");
/*
ADRESS /api/create/post
METHOD POST
DESC Creating new post
*/

router.post("/create/post", passport.authenticate("jwt",{session : false}), [
  check("title", "Title should not be empty").notEmpty(),
  check("body", "body should not be empty").notEmpty(),
  check("img", "Image header should not be empty").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array()});
  }
  
  try {
    var { title, body, img} = req.body;
    
    const user = req.user;
  
    const post = new Post({
      title,
      body,
      img,
      author: user._id
    });

    fetch(img).then().catch((err) => {
      if(err.message === "Only absolute URLs are supported") {
        return post.img = "https://i.ibb.co/4WJfm8F/noimg-placeholder.png"
      }
      else {
        res.status(400).json({ error: err.message});
      }
    });

    post.save();

    post.populate("author", "username", (err, post) => {
      if(err) throw err;

      console.log(post);
      res.status(200).json(post);
    })

  } catch (err) {
    console.log(err);
    return res.status(400).json({error: err});
  }
});

/*
ADRESS /api/posts
METHOD GET
DESC Get all posts
*/

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username role").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Internal error"});
  }
});

/*
ADRESS /api/post/:id
METHOD GET
DESC Get post by id
*/

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");

    res.json(post);
  } catch (err) {

    if(err.kind == "ObjectId") {
      return res.status(404).json({ message: "Post not found"});
    }

    console.log(err);
    res.status(400).json({ message: "Internal error"});
  }
});

/*
ADRESS /api/edit/post/:id
METHOD PUT
DESC edit post by id
*/

router.put("/edit/post/:id", passport.authenticate("jwt",{session : false}),async (req, res) => {
  var { title, body, img} = req.body;

  if(!title && !body && !img){
    return res.status(400).json({ message: "You have to edit something" });
  }

  try {
    const post = await Post.findById(req.params.id);
  
    post.title = title;
    post.body = body;
    post.img = img;

    fetch(post.img).then().catch((err) => {
      if(err.message === "Only absolute URLs are supported") {
        return post.img = "https://i.ibb.co/4WJfm8F/noimg-placeholder.png"
      }
      else {
        res.status(400).json({ error: err.message});
      }
    });

    post.save((err, post) => {
      console.log(post);
      res.status(200).json(post);
    })
    
  } catch (err) {
    if(err.kind == "ObjectId") {
      return res.status(404).json({ message: "Post not found"});
    }

    console.log(err);
    res.status(400).json({ message: "Internal error"});
  }
});

/*
ADRESS /api/delete/post/:id
METHOD DELETE
DESC delete post by id
*/

router.delete("/delete/post/:id", passport.authenticate("jwt",{session : false}) ,async (req, res) => {

  try {
    const result = await Post.findByIdAndDelete(req.params.id);

    res.json({ message: `deleted post ${result.title} successfully`});
  } catch (err) {
    if(err.kind == "ObjectId") {
      return res.status(404).json({ message: "Post not found"});
    }

    console.log(err);
    res.status(400).json({ message: "Internal error"});
  }
})


module.exports = router;