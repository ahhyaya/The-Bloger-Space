const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all comments after login
router.get("/", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      include: [User],
    });
    const comments = dbCommentData.map({
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
