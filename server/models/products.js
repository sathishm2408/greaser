const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

let ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Description: {
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
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    viewed: {
        type: String,
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