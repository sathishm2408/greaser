const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product-inventory',{useNewUrlParser:true,useUnifiedTopology: true,})