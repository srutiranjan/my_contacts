
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc user register
//@routes POST api/users/register 
//@public

const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");

    }
    const existsUser = await User.findOne({email});
    //console.log(existsUser);
    if(existsUser){
        res.status(400);
        throw new Error("User  already registed!");

    }
    const hashedPassword = await bcrypt.hash(password,10);
    //console.log(hashedPassword);
    const cretateUser = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(cretateUser){
        res.status(201).json({_id:cretateUser.id, email : cretateUser.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid!");

    }
    //res.status(200).json("resister");
});
//@desc user register
//@routes POST api/users/login 
//@public

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const getUser = await User.findOne({email});
    if(getUser && (await bcrypt.compare(password,getUser.password))){
        const accessToken = jwt.sign({
             user :{
                username : getUser.username,
                email : getUser.email,
                id : getUser._id,
             },
        },process.env.ACCESS_TOKEN,{expiresIn : "5m"},
        )
        res.status(200).json({accessToken:accessToken}); 
    }else{
        res.status(401);
        throw new Error("Invalid Username or password !");
    }
    //res.status(200).json("login");
});
//@desc user register
//@routes GET api/users/current 
//@private

const currentUser = asyncHandler(async(req,res)=>{
    const userDetails = req.user;
    res.status(200).json(userDetails);
});

module.exports= {registerUser,loginUser,currentUser}