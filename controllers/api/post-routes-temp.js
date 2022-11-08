const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content'
        ],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: [
                'id',
                'comment-detail',
                'post_id',
                'user_id'
            ],
            include: [{
                model: User,
                attributes: ['username']
            }]
        }]
    })
        .then(dbPostData => 
            res.json(dbPostData.reverse()));
    //      .catch (err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
});

module.exports = router;
