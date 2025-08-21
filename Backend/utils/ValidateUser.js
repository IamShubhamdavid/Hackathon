const validator=require("validator");

function ValidateUser(data){
// Validate kya uske andar firstName
// req.body ke andar data aaya hai, usmein first_name present hona chahiye
    const mandatoryField=["firstName","emailId","age","password"]

    // API level validation kr rha hun
    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));
    if(!IsAllowed)
        throw new Error("Fields Missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak Password");

    if(!(data.firstName.length>=3 && data.firstName.length<=20))
        throw new Error("Name shoul have atleast 3 char and atmost 20 char");

        // Password ka validation krenge
        //firstname>3 max<20

};
module.exports={ValidateUser};