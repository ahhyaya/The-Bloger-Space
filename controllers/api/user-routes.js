const router = require ('express').Router();
// const { resourceUsage } = require('process');
const { User, Post, Comment } = require('../../models');

// new user signup
router.post('/', async(req,res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            res.json(dbUserData);
        });
    } 
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user login
router.post('/login', async(req, res) => {
    console.log(req.body)
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        
        if(!dbUserData) {
            res
            .status(400)
            .json({message: 'Incorrect username or password. Please try again!'});
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect password. Please try again!'});
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = dbUserData.username;
            req.session.user_id = dbUserData.id;
            res.json({ message: 'You are now logged in!'});
        });
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// user logout
router.post('/logout', (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;