const express = require('express');
const router = express.Router();
require('../db/mongoose');
const auth = require('../middleware/auth')
const Product = require('../models/products');

router.get('/all',async (req, res) => {
    //console.log(req.body);
    try {
        const product = await Product.find();
        //console.log(user);
        if (!product)
            res.status(400).send("Product not found")

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/views',auth,async (req, res) => {
    //console.log(req.body);
    try {
        const product = await Product.find().sort({viewed:-1});
        //console.log(user);
        if (!product)
            res.status(400).send("Product not found")

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/add', auth,(req, res) => {
    let product = new Product({
        ...req.body,
        creator : req.user._id
    });

    product.save().then(() => {
        res.send({product});
    }).catch((err) => {
        if(err)
        res.status(400).send({message:err.message});
        console.log(err);
    });
});

router.get('/myProducts', auth,async (req, res) => {
    try {
        await req.user.populate('myProducts').execPopulate(); 
        res.send(req.user.myProducts);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/update/:id',auth, async (req, res) => {
    //console.log(req.body);
    const updates = Object.keys(req.body);
    let updatedBy = req.user._id;
    let updatedTime = new Date();
    const updater = {updatedBy,updatedTime}
    try {
        const product = await Product.findOne({_id:req.params.id});
        //console.log(user);
        if (!product)
            res.status(400).send("Your products are not found")

        updates.forEach((update) => {
            product[update] = req.body[update];
        });
        product.updates.push(updater);
        await product.save();
        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', auth,async (req, res) => {
    //console.log(req.body);
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            res.status(400).send("Product not found")

        await product.viewed++;
        await product.populate('creator').execPopulate();
        
        product.save()
        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.delete('/:id', auth,async (req, res) => {
    //console.log(req.body);
    let creator = req.user._id;
    try {
        const product = await Product.findOneAndDelete({_id:req.params.id,creator:req.user._id});
        //console.log(user);

        if (!product)
            res.status(400).send("Product not found")

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;