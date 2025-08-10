const {BookModel,UserModel}=require("../models/index.js");
const userModel = require("../models/user-model.js");

exports.getAllUsers = async (req,res)=>{
    const Users =await userModel.find();
    if(Users.length===0){
        return res.status(404).json({
            success:false,
            message:`No Users found`
        });
    }

    res.status(200).json({
        success:true,
        data:Users
    })
}