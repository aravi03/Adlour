var express = require('express');
var router = express.Router();
const passport = require("passport")
const checkAuthenticated = require('../utils/authMiddleware'); // Adjust the path as needed
const User = require("../models/User");
const frontendURL=`${process.env.FRONTEND_URL}`  
const axios = require('axios');
  checkLoggedIn = (req, res, next) => {
    console.log('here in cL',req.isAuthenticated())
    if (req.isAuthenticated()) { 
         return res.redirect(frontendURL+"/creator/home")
     }
    next()
  }
router.get('/google',
    checkLoggedIn,passport.authenticate('googleUser', { scope: [ 'email', 'profile'
      // ,'https://www.googleapis.com/auth/youtube.readonly' 
    ]
  }));
  
  router.get('/google/callback', passport.authenticate('googleUser'),async (req,res,next)=>{
    try{
    console.log("req user ID is ",req.user._id)
    console.log('Session in user:', req.session);

    // const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
    //   params: {
    //     part: 'contentDetails,snippet,statistics,status,topicDetails,brandingSettings,contentOwnerDetails,localizations',
    //     mine: true
    //   },
    //   headers: {
    //     Authorization: `Bearer ${req.user.youtube.GoogleAccessToken}`
    //   }
    // });
    // const channels = response.data.items;
    //       if (channels.length === 0) {
    //         res.send('No youtube channel linked to this account was found.');
    //       } else {
    //         const channel = channels[0];
    //         const channelLink = `https://www.youtube.com/channel/${channel.id}`;
    //         const channelName = channel.snippet.title;
    //         const subscriberCount = channel.statistics.subscriberCount;
    //         const viewCount = channel.statistics.viewCount;            
    //         console.log('thumbnail',channel.snippet.thumbnails)
    //         console.log(channel.snippet.localized)
    //         console.log(channel.brandingSettings.channel)
    //         console.log(channel.contentDetails.relatedPlaylists)
    //         const filter = { _id: req.user._id };
    //         const youtube={channelLink,channelName,subscriberCount,viewCount}
    //         const update = {youtube}
    //         const doc=await User.findOneAndUpdate(filter,update)   
    //         res.redirect(frontendURL+'/creator/profile')    
    //       }
                res.redirect(frontendURL+'/creator/profile')    

  }    catch(err){
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
  }    catch(err){
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
  }    catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })

  router.post("/login", passport.authenticate("local"), (req, res, next) => {
    try{
    console.log("user is login",req.user)
    if(req.user)    res.json({"user":req.user})
      else  res.json({"user":null})
  }    catch(err){
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
  }    catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }      
  })

  module.exports=router;