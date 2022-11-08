const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['comment_detail'],
                },
            ],
        });

        const posts = dbPostData.map((post) => 
        post.get({ plain: true })
        );
        console.log(req.session);
        console.log("req.sessionID", req.sessionID)
        res.render("homepage", { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one post by ID
router.get('/post/:id', async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbPostData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'title',
                            'content',
                            'created_at'
                        ],
                    },
                ],
            });
            const post = dbPostData.get({ plain: true });
            res.render('post', {post, loggedIn: req.session.loggedIn });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// GET a single comment by ID
router.get('/comment/:id', async(req,res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbCommentData = await Comment.findByPk(req.params.id, {
                include: [
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'comment_detail',
                        ],
                    },
                ],
            });
            const comment = dbCommentData.get ({ plain: true });
            res.render('comment', {comment, loggedIn: req.session.loggedIn});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// GET login
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// GET signup
router.get('/signup', (req, res) => {
    res.render('signup')
})

module.exports = router;