const express=require("express");

const {UserModel, BookModel} = require("../models/index.js");
const { getAllUsers, getUserByID, createUser, updateUser, deleteuser, getSubbyID } = require("../controllers/user-controller.js");

const router=express.Router();

router.get("/",getAllUsers);

router.get('/:id',getUserByID);

router.post('/',createUser);

router.put('/:id',updateUser);

router.delete('/:id',deleteuser);

router.get('/subscription-details/:id', getSubbyID);


module.exports=router;