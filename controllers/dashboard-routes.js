const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');


// GET all posts with comments after signin
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'create_at'
        ],
        include: [{
            model: Comment,
            attributes: [
                'id',
                'comment_detail',
                'post_id',
                'user_id',
                'create_at'
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
    ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts)
            res.render("dashboard", {
                posts,
                loggedIn: true
            });
        });
    // .catch (err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
});

// click on the post title
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if(postData) {
            const post = postData.get({plain:true});
            console.log(post)
            res.render('edit-post', {
                views:'dashboard',
                post
            })
        } else {
            res.status(404).end();
        } 
    }catch (err) {
        res.status(500).json(err);
    }
})


// Create new post by logged in user
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        views: 'dashboard',
    });
});

module.exports = router;
