var express = require('express');
var router = express.Router();
const passport = require("passport")
const checkBrandAuthenticated = require('../utils/authBrandMiddleware'); // Adjust the path as needed
const Brand = require("../models/Brand");
const frontendURL=`${process.env.FRONTEND_URL}`  

  checkLoggedIn = (req, res, next) => {
    console.log('here in cL',req.isAuthenticated())
    if (req.isAuthenticated()) { 
         return res.redirect(frontendURL+"/brand/home")
     }
    next()
  }
router.get('/google',
    checkLoggedIn,passport.authenticate('googleBrand', { scope: [ 'email', 'profile' ]
  }));
  
  router.get('/google/callback', passport.authenticate('googleBrand'),(req,res,next)=>{
    try{
    console.log("req user is ",req.user)
    res.redirect(frontendURL+'/brand/home')  }
    catch(error){
      console.error('Error finding campaigns by author:', err);
      res.send("Error occured")
    }  
  })
  
  router.get('/logout',checkBrandAuthenticated ,function(req, res, next){
    try{
    req.logout(function(err) {
      console.log("Logged out")
      if (err) { return next(err); }
      res.redirect(frontendURL+'/brand/login');
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
    if(user&&user.accountType=='brand')    res.json({"user":user})
    else  res.json({"user":null})
  }    catch(error){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })

  router.post("/login", passport.authenticate("localBrand"), (req, res, next) => {
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
    const brand = new Brand({ email, name })
    console.log(brand)
    const registeredUser = await Brand.register(brand, password)
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