const router = require ('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// get all comments

router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['comment_detail'],
                },
            ],
        });
        const comments = dbCommentData.map((comment) => 
        comment.get({ plain: true })
        );
        console.log(req.session);
        console.log("req.sessionID", req.sessionID)
        res.render("comments", { comments });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// // get one comment by ID
// router.get('/comment/:id', async (req, res) => {
//     if(!req.session.loggedIn) {
//         res.redirect('/login');
//     } else {
//         try {
//             const dbCommentData = await Comment.findByPk(req.params.id, {
//                 include: [
//                     {
//                         model: Comment,
//                         attributes: [
//                             'id',
//                             'comment_detail'
//                         ],
//                     },
//                 ],
//             });
//             const comments = dbCommentData.get({ plain: true });
//             res.render('comments', {comments, loggedIn: req.session.loggedIn });
//         } catch(err) {
//             console.log(err);
//             res.status(500).json(err);
//         }
//     }
// });

module.exports = router;
