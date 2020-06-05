const Consumer = require('../models/consumer');
const jwt = require("jsonwebtoken");

const consumerAuth = async (req,res,next)=>{
    try{
        const token = req.header('x-access-token');
        //console.log(token);
        
        const decoded = jwt.verify(token,"greaser-consumer");
        console.log(decoded);
        
        const consumer = await Consumer.findOne({_id: decoded._id, 'tokens.token': token })

        if(!consumer)
            throw new Error();
    
        req.token = token;
        req.consumer = consumer;
        next();
    }catch(e){
        res.status(401).send({error:"User is not authenticated"})
    }
}

module.exports = consumerAuth;