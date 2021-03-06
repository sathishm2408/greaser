const express = require('express');
const router = express.Router();
const fs = require('fs');
const mv = require('mv');
const multer = require('multer');
// var upload = multer({ dest: 'server/uploads/temp/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/temp/')
    },
    filename: function (req, file, cb) {
        var extension = '.' + file.originalname.split('.').pop();
        cb(null, file.fieldname + extension)
    }
});
var upload = multer({ storage: storage })
require('../db/mongoose');
const auth = require('../middleware/auth')
const Product = require('../models/products');

var picUpload = upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
    { name: 'file4', maxCount: 1 },
    { name: 'file5', maxCount: 1 }])

router.get('/all', async (req, res) => {
    //console.log(req.body);
    try {
        const product = await Product.find();
        //console.log(user);
        if (!product)
            res.status(200).send("No Products in inventory. Add Products")

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/views', auth, async (req, res) => {
    //console.log(req.body);
    try {
        const product = await Product.find().sort({ viewed: -1 });
        //console.log(user);
        if (!product)
            res.status(400).send("Product not found")

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/add', auth, picUpload, (req, res) => {
    // console.log("addddd file", req.file);
    // console.log("addddd body", JSON.parse(req.body.data));
    var data = JSON.parse(req.body.data);
    var id = Date.now();
    var dir = `public/uploads/${id}`;
    var dir2 = `uploads/${id}`;
    let images = [];
    var i = 0;

    mv('public/uploads/temp/', dir, { mkdirp: true }, function (err) {
        if (err)
            console.log("error in moving files", err);
        else if (!fs.existsSync('public/uploads/temp'))
            fs.mkdirSync('public/uploads/temp');
        console.log("moved successfully")
        fs.readdirSync(dir).forEach(file => {
            images.push(dir2 + '/' + file)

            //console.log(file);
        });
        let product = new Product({
            _id: id,
            ...data,
            images,
            creator: req.user._id
        });
        product.save().then(() => {
            // console.log("add product", product);
            res.send({ product });
        }).catch((err) => {
            if (err)
                res.status(400).send({ message: err.message });
            // console.log(err);
        });
    });
});

router.get('/myProducts', auth, async (req, res) => {
    try {
        await req.user.populate('myProducts').execPopulate();
        res.send(req.user.myProducts);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/update/:id', auth, picUpload, async (req, res) => {
    console.log(req.body);
    let images = [];
    var data = JSON.parse(req.body.data);
    const updates = Object.keys(data);
    console.log("updates " + updates + "data" + data);

    let updatedBy = req.user._id;
    let updatedTime = new Date();
    const updater = { updatedBy, updatedTime }
    try {
        const product = await Product.findOne({ _id: req.params.id });
        //console.log(user);
        if (!product)
            res.status(400).send("Your products are not found")

        updates.forEach((update) => {
            product[update] = data[update];
        });
        product.updates.push(updater);


        // if (fs.existsSync(`public/uploads/${req.params.id}`)) {
        //     fs.readdirSync(`public/uploads/${req.params.id}`).forEach(img => {
        //         var images = img.split('.')[0]
        //         console.log(images);
        //         if (images === file.fieldname)
        //             fs.unlinkSync(`public/uploads/${req.params.id}/${img}`, err => {
        //                 if (err)
        //                     console.log("error while deleting file for updation",err);
        //             })
        //             cb(null,`public/uploads/${req.params.id}`)
        //     })
        // }

        fs.readdirSync('public/uploads/temp').forEach(file => {
            mv(`public/uploads/temp/${file}`, `public/uploads/${req.params.id}/${file}`, function (err) {
                if (err)
                    console.log("error while moving files in updating", err);
            })
        })

        fs.readdirSync(`public/uploads/${req.params.id}`).forEach(file => {
            images.push(`uploads/${req.params.id}/${file}`)
        });

        product.images = images;
        await product.save();
        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/:id', auth, async (req, res) => {
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


router.delete('/:id', auth, async (req, res) => {
    //console.log(req.body);
    let creator = req.user._id;
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, creator: req.user._id });
        console.log("in backend delete", product);

        if (!product)
            res.status(400).send("Product not found")
        else if (fs.existsSync(`public/uploads/${req.params.id}`)) {
            fs.readdirSync(`public/uploads/${req.params.id}`).forEach(file => {
                fs.unlinkSync(`public/uploads/${req.params.id}/${file}`, err => {
                    if (err)
                        console.log("err", err)
                    console.log(file + " delted");
                })
                console.log(file + "found");

            })
            fs.rmdirSync(`public/uploads/${req.params.id}`);
            // }
            // fs.remove(`public/uploads/${req.params.id}`)
            console.log("folder exists");

            res.send(product);
        }
        else
            res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;