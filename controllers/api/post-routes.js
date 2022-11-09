const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET all posts after login
router.post('/', withAuth, async(req, res) => {
    const body = req.body;
    console.log(body)
    try {
        const newPost = await Post.create( 
            {
                ...body, user_id:req.session.user_id 
            }
        );
        console.log(newPost)
        res.json(newPost)
    } catch(err) {
        console.log('Create New Post Failed!', err);
        res.status(500).json(err);
    }
    // Post.findAll({
    //     attributes: [
    //         'id',
    //         'title',
    //         'content',
    //         'create_at'
    //     ],
    //     include: [
    //         {
    //         model: User,
    //         attributes: ['username']
    //         },
    //         {
    //         model: Comment,
    //         attributes: [
    //             'id',
    //             'comment_detail',
    //             'post_id',
    //             'user_id',
    //             'create_at'
    //         ],
    //         include: [{
    //             model: User,
    //             attributes: ['username']
    //         }]
    //     }]
    // })
    //     .then(dbPostData => 
    //         res.json(dbPostData.reverse()));
    //      .catch (err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
});

// UPDATE post
router.put('/:id', withAuth, async (req, res) => {
    try{
        console.log(req.body)
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// DELETE post
router.delete('/:id', withAuth, (req, res) => {
    try{
        const [affectedRows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if(affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
