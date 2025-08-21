const express=require("express");

const userRouter=express.Router();
const userAuth=require("./middleware/userAuth");
const User = require("./Models/user")


app.get("/", async(req,res)=>{
    
    try{

        // code likhna padege, user ko authenticate kar paauon
        
        res.send(req.result);

    }
    catch(err){
       
        res.send("Error "+err.message);
    }


})

app.delete("/:id",userAuth, async (req,res)=>{

    try{

        // authenticate the user:

        await User.findByIdAndDelete(req.params.id);
        res.send("Deleted Succesfully");
    }
    catch(err){
        
        res.send("Error"+err.message);
    }


})

app.patch("/",userAuth, async(req,res)=>{

    try{
        const {_id, ...update} = req.body;

        await User.findByIdAndUpdate(_id,update,{"runValidators":true});
        res.send("Update Succesfully");
    }
    catch(err){
        res.send("Error "+err.message);
    }
})