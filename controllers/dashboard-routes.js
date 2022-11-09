const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');
// const { mapFinderOptions } = require('sequelize/types/utils');


// GET all posts with comments after signin
router.get('/', withAuth, (req, res) => {
    try{
    const postData = Post.findAll({
        where: {
            "user_id": req.session.user_id
        },
        include: [User],
});
const posts = postData.map((post) => post.get({ plain: true }));

res.render('post', {
    // views: homepage,
    posts,
});
} catch(err) {
    res.status(404).end();
}
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
                post,
            })
        } else {
            res.status(404).end();
        } 
    }catch (err) {
        res.status(500).json(err);
    }
})

// After click on new post 
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: main
    });
});

// // Create new post by logged in user
// router.get('/new', withAuth, (req, res) => {
//     res.render('new-post', {
//         views: 'dashboard',
//     });
// });

module.exports = router;
