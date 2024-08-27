var express = require('express');
var router = express.Router();
const passport = require("passport")
const checkAuthenticated = require('../utils/authMiddleware'); // Adjust the path as needed
const User = require("../models/User");
const frontendURL=`${process.env.FRONTEND_URL}`  

  checkLoggedIn = (req, res, next) => {
    console.log('here in cL',req.isAuthenticated())
    if (req.isAuthenticated()) { 
         return res.redirect(frontendURL+"/creator/home")
     }
    next()
  }
router.get('/google',
    checkLoggedIn,passport.authenticate('googleUser', { scope: [ 'email', 'profile' ]
  }));
  
  router.get('/google/callback', passport.authenticate('googleUser'),(req,res,next)=>{
    try{
    console.log("req user ID is ",req.user._id)
    res.redirect(frontendURL+'/creator/home')
  }    catch(error){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })
  
  router.get('/logout',checkAuthenticated ,function(req, res, next){
    try{
    req.logout(function(err) {
      console.log("Logged out")
      if (err) { return next(err); }
      res.redirect(frontendURL+'/creator/login');
    });
  }    catch(error){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })
  
  router.get("/isloggedin", function (req, res) {
    try{
    const user=req.user
    console.log("user is isloggedin",user)
    if(user&&user.accountType=='creator')    res.json({"user":user})
    else  res.json({"user":null})
  }    catch(error){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })

  router.post("/login", passport.authenticate("local"), (req, res, next) => {
    try{
    console.log("user is login",req.user)
    if(req.user)    res.json({"user":req.user})
      else  res.json({"user":null})
  }    catch(error){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })

  router.post("/signup", async(req, res, next) => {
    try{
    const { email, password, name } = req.body
    const user = new User({ email, name })
    console.log(user)
    const registeredUser = await User.register(user, password)
    console.log(registeredUser)
    res.status(201).json({
      message: 'User registered successfully',
      user: registeredUser,
    })  
  }    catch(error){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }      
  })

  module.exports=router;