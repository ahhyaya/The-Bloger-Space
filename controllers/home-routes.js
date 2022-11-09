const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['comment_detail'],
                },
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const posts = dbPostData.map((post) => 
        post.get({ plain: true })
        );
        console.log(req.session);
        console.log("req.sessionID", req.sessionID)
        console.log("posts", posts)
        res.render("homepage", { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one post by ID
router.get('/post/:id', withAuth, async (req, res) => {
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
                            'comment_detail',
                            'created_at'
                        ],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
            });
            const post = dbPostData.get({ plain: true });
            res.render('single-post', {post, loggedIn: req.session.loggedIn });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

router.get('/post-comments', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_detail', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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