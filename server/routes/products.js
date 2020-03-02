const express = require('express');
const router = express.Router();
const fs = require('fs');
const mv = require('mv');
const multer = require('multer');
// var upload = multer({ dest: 'server/uploads/temp/' });
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/temp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage})
require('../db/mongoose');
const auth = require('../middleware/auth')
const Product = require('../models/products');

var picUpload = upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
    { name: 'file4', maxCount: 1 },
    { name: 'file5', maxCount: 1 }])

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

router.post('/add', auth,picUpload,(req, res) => {
    console.log("addddd file", req.file);
    console.log("addddd body", JSON.parse(req.body.data));
    var data = JSON.parse(req.body.data);
    var id = Date.now();
    var dir =`server/uploads/${id}`;
    // if (!fs.existsSync(dir)){
    //     fs.mkdirSync(dir);
    // }
        mv('server/uploads/temp/', dir, {mkdirp: true}, function(err) {
            if(err)
            console.log("error in moving files",err);
            fs.mkdirSync('server/uploads/temp');
            console.log("moved successfully");
            
            
            // done. it first created all the necessary directories, and then
            // tried fs.rename, then falls back to using ncp to copy the dir
            // to dest and then rimraf to remove the source dir
          });
    // }
    let product = new Product({
        ...data,
        _id : id,
        creator : req.user._id
    });

    
    product.save().then(() => {
        console.log("add product",product);
        
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