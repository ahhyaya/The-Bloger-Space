const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [User],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(req.session);
    console.log("req.sessionID", req.sessionID);
    console.log("posts", posts);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post by ID
router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const singlePostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (singlePostData) {
      const post = singlePostData.get({ plain: true });

      console.log(post);
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// get one post by ID with comments
router.get("/posts/:id/comments", withAuth, async (req, res) => {
  try {
    const singlePostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (singlePostData) {
      const post = singlePostData.get({ plain: true });

      console.log(post);
      res.render("single-post-withComment", { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// GET signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
