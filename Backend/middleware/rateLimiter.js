const redisClient=require("../config/redis");

// Total time
const windowSize= 3600;
const MaxRequest=60;

const rateLimiter=async (req,res ,next)=>{

    try{
        const key=`IP${req.ip}`;
        const current_time=Date.now()/1000;
        const window_Time=current_time-windowSize;
        // 1.20 minute- 1 hour= 12.20 =39442 seconds mein store rehta h
        
       await redisClient.zRemRangeByScore(key,0,window_Time);

       const numberofRequest= await redisClient.zCard(key);
       // Total number of value kitni hai
       if(numberofRequest>=MaxRequest){
        throw new Error("Number of Request Excceded");
       }

       await redisClient.zAdd(key,[{score:current_time, value:`${current_time}:${Math.random()}`}]);
       // Request is Added

       // Key TTL hai uso increase karna
       await redisClient.expire(key,windowSize);

       next();

    }
    catch(err){

        res.send("Error"+err);
    }

}

module.exports=rateLimiter;