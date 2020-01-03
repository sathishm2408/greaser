const User = require('../models/User');
const jwt = require("jsonwebtoken");

const auth = async (req,res,next)=>{
    try{
        const token = req.header('x-access-token');
        //console.log(token);
        
        const decoded = jwt.verify(token,"product-inventory");
        console.log(decoded);
        
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token })

        if(!user)
            throw new Error();
    
        req.token = token;
        req.user = user;
        next();
    }catch(e){
        res.status(401).send({error:"User is not authenticated"})
    }
}

module.exports = auth;