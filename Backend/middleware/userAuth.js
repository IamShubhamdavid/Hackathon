const jwt=require('jsonwebtoken');
const User=require("../Models/user");
const redisClient=require("../config/redis");

const userAuth=async (req,res,next)=>{

    try{
        const{token}=req.cookies;
        if(!token){
            throw new Error("Token doesnot exist");
        }

        const payload =  jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        // console.log(payload);

        const{id}=payload;
        if(!id){
            throw new Error("Id is missing");
        }
        const result = await User.findById(payload._id);

        if(!result){
            throw new Error("User doesn't exist");
        }

       const IsBlocked= await redisClient.exists(`token:${token}`);

       if(IsBlocked)
        throw new Error("Invalid Token");

        req.result=result;
        
        next();

    }
    catch(err){
        res.send("Error: "+err.message);
    }
}

module.exports={userAuth};