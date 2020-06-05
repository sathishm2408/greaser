const express = require('express');
const router = express.Router();
require('../db/mongoose');
const consumerAuth = require('../middleware/consumerAuth')
const Consumer = require('../models/consumer');

router.post('/signup', (req, res) => {

    let consumer = new Consumer(req.body);

    consumer.save().then(() => {
        res.send({consumer,message:"Successfully registered"});
    }).catch((err) => {
        if(err.code==11000)
        res.status(400).send({message:"User already exist.Use different email or username."});
        console.log(err);
        // throw new Error('Error while saving User model')
    });
});


router.put('/update/:id', async (req, res) => {
    //console.log(req.body);
    const updates = Object.keys(req.body);
    try {
        const consumer = await Consumer.findById(req.params.id);
        //console.log(user);

        if (!consumer)
            res.status(400).send("User not found")

        updates.forEach((update) => {
            consumer[update] = req.body[update];
        });
        await consumer.save();
        res.send(consumer);

    } catch (e) {
        res.status(400).send(e);
    }

});


router.post('/login', async (req, res) => {
    try {
        const consumer = await Consumer.findByCredentials(req.body.emailId, req.body.password);
        const token = await consumer.generateAuthToken();
        console.log(token);
        
        res.status(200).send({ consumer, token,message:"Successfully Logged in"} );
    } catch (e) {
        console.log(e.message)
        res.status(404).send({message: e.message})
    }
});

// router.get('/users/me', auth, async (req, res) => {
//    res.send(req.user);
// });

router.get('/logout', consumerAuth,async (req, res) => {
    try {
        req.consumer.tokens = req.consumer.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.consumer.save();
        // res.send({logout:true});
        res.status(200).send("success")
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/logoutAll', consumerAuth,async (req, res) => {
    try {
        req.consumer.tokens = [];
        await req.consumer.save();
        res.send("loggedout all sessions")
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;