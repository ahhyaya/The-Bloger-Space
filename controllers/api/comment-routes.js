const router = require ('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// GET all comments after login
router.get('/', withAuth, async (req, res) => {
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


// CREATE a new comment
router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    try{
        const newComment = await Comment.create({
            ...body,
            user_id:  req.session.user_id,
        });
        res.json(newComment);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_detail: req.body.comment_detail
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
