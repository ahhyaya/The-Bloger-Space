const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// CREATE a new post after login
router.post('/', withAuth, (req, res) => {

        const newPost = Post.create( 
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            })
            .then(newPost => res.json(newPost))
         .catch(err => {
        console.log('Create New Post Failed!', err);
        res.status(500).json(err);
    });
});

// UPDATE post
router.put('/:id', withAuth, async (req, res) => {
    try{
        console.log(req.body)
        const updatePostData = await Post.update( 
            {
            title: req.body.title,
            content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
        });

        if(!updatePostData) {
            res.status(404).json({message: "No post found with this user!"});
            return;
        } 
        res.json(updatePostData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// DELETE post
router.delete('/:id', withAuth, async(req, res) => {
    try{
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(404).json({message: `No post by user user_id = ${req.session.user_id} found with id = ${req.params.id}` });
            return;
        } 
        res.json(postData);
        } catch(err) {
        res.status(500).json(err);
    }
});

// CREATE a new comment
router.post("/:id/comments", withAuth, async (req, res) => {
    const body =req.body;
  try {
    const newComment = await Comment.create({
      ...body,
      user_id: req.session.user_id,
    })
     res.json(newComment);
  }
  catch(err) {
        console.log(err);
        res.status(400).json(err);
      };
  });

module.exports = router;
