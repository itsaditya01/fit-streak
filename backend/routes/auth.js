const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/createuser', async (req, res) => {
    try {
        //creates new user
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
        })
        res.json(user);
    }
    //catches error
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

router.post('/getuser', async (req, res) => {
    try {
        const user_email = req.body.email;
        const user = await User.findOne({ email: user_email });
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/searchfriend', async (req, res) => {
    try {
        const user_username = req.body.username;
        const user = await User.findOne({ username: user_username });
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/friendreq', async (req, res) => {
    try {
        const friend_username = req.body.friend_username;
        const own_username = req.body.own_username;
        const friend_user = await User.findOne({ username: friend_username });
        const own_user = await User.findOne({ username: own_username });
        friend_user.friendsreq.push(own_username);
        own_user.friendsreq.push(friend_username);
        res.status(200).send({ friend_user, own_user });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/acceptfriendreq', async (req, res) => {
    try {
        const friend_username = req.body.friend_username;
        const own_username = req.body.own_username;
        const friend_user = await User.findOne({ username: friend_username });
        const own_user = await User.findOne({ username: own_username });
        friend_user.friends.push(own_username);
        own_user.friends.push(friend_username);
        res.status(200).send({ friend_user, own_user });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/declinefriendreq', async (req, res) => {
    try {
        const friend_username = req.body.friend_username;
        const own_username = req.body.own_username;
        const friend_user = await User.findOne({ username: friend_username });
        const own_user = await User.findOne({ username: own_username });
        friend_user.friendsreq.splice(friend_user.friendsreq.indexOf(own_username), 1);
        own_user.friendsreq.splice(own_user.friendsreq.indexOf(friend_username), 1);
        res.status(200).send({ friend_user, own_user });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;