const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

let ProductSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required:true,
        trim: true,
        lowercase: true
    },
    sleeveType:{
        type: String,
        trim: true,
        lowercase: true
    },
    neckType:{
        type: String,
        trim: true,
        lowercase: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    salesPrice: {
        type: Number,
        required: true,
        trim: true
    },
    MRP: {
        type: Number,
        required: true,
        trim: true
    },
    manufactureCost: {
        type: Number,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    images:[{
        type: String
    }],
    viewed: {
        type: String,
        default: 0
    },
    ordered: {
        type: Number,
        default: 0
    },
    creator:{
		type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
	},
    updates:[{
        updatedBy:{
		type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        updatedTime:{
            type: String
        }
	}]
});


// ProductSchema.methods.toJSON = function () {
//     const product = this;
//     const productObject = product.toObject();

//     delete productObject.viewed;
//     return productObject;
// }


let Product = mongoose.model("Product", ProductSchema);

module.exports = Product