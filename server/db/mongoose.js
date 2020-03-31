const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product-inventory2',{useNewUrlParser:true,useUnifiedTopology: true,})