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
        const user = await User.findOne({ user_email });
        res.send(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;