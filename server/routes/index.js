const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('../db/mongoose');
const auth = require('../middleware/auth')
const User = require('../models/User');

router.post('/users/signup', (req, res) => {

    let user = new User(req.body);

    user.save().then(() => {
        res.send({user,message:"Successfully registered"});
    }).catch((err) => {
        if(err.code==11000)
        res.status(400).send({message:"User already exist.Use different email or username."});
        console.log(err);
        // throw new Error('Error while saving User model')
    });
});


router.put('/users/update/:id', async (req, res) => {
    //console.log(req.body);
    const updates = Object.keys(req.body);
    try {
        const user = await User.findById(req.params.id);
        //console.log(user);

        if (!user)
            res.status(400).send("User not found")

        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);

    } catch (e) {
        res.status(400).send(e);
    }

});


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.emailId, req.body.password);
        const token = await user.generateAuthToken();
        console.log(token);
        
        res.status(200).send({ user, token,message:"Successfully Logged in"} );
    } catch (e) {
        console.log(e.message)
        res.status(404).send({message: e.message})
    }
});

router.get('/users/me', auth, async (req, res) => {
   res.send(req.user);
});

router.get('/users/logout', auth,async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        // res.send({logout:true});
        res.status(200).send("success")
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/logoutAll', auth,async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("loggedout all sessions")
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;