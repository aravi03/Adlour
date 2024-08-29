var express = require('express')
var router = express.Router()
const checkAuthenticated = require('../utils/authMiddleware') // Adjust the path as needed
const Campaign = require("../models/Campaign")
const Brand = require("../models/Brand")
const User = require("../models/User")
const Chat = require("../models/Chat")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types;  // Import ObjectId if needed
router.post("/update/:userID",async function (req, res) {
    try{
    var {userID}=req.params
    userID= new ObjectId(userID)
    const filter = { _id: userID };
    const {name,channelLink,category,location,description,language}=req.body
    const update = {name,channelLink,category,location,description,language}
    console.log(userID,update)
    const doc=await User.findOneAndUpdate(filter,update)
    console.log(doc)
    res.json({'user':doc})
  }    catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
})

router.post("/updatepic/:userID",async function (req, res) {
  try{
  var {userID}=req.params
  userID= new ObjectId(userID)
  const filter = { _id: userID };
  const {profilePic}=req.body
  const update = {profilePic}
  console.log(userID,update)
  const doc=await User.findOneAndUpdate(filter,update)
  console.log(doc)
  res.json({'user':doc})
}    catch(err){
  console.error('Error finding campaigns by author:', err);
  res.send("Error occured")
}  
})

router.post("/user/searchbrand",async function (req, res) {
    try{
    const name = req.body.query
    const docs=await Brand.find(
        { "name": { "$regex": name, "$options": "i" }})    
    console.log(docs)
    res.json({brands:docs})
  }    catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }    

})

router.post("/user/searchcampaign",async function (req, res) {
   try{
    const name = req.body.query
    const docs=await Campaign.find(
        { "name": { "$regex": name, "$options": "i" }}).sort({ deadline: -1 })
        console.log(docs)
        res.json({campaigns:docs})
      }    catch(err){
        console.error('Error finding campaigns by author:', err);
        res.send("Error occured")
      }  

})

router.get("/user/viewbrand/:id",async function (req, res) {
    try{
    const id=req.params.id
    const brand= await Brand.findById(id)
    res.json({brand})
  }    catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
})

router.post("/user/viewcampaigns",async function (req, res) {
    try{
    const brandID=req.body.brandID
    const campaigns= await Campaign.find({author:brandID}).sort({ deadline: -1 })
    console.log(campaigns)
    res.json({campaigns})
  }    catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
   
})

router.post("/campaigns/apply/:campaignId",async function (req, res) {
    const { campaignId } = req.params;
    const { userID,name } = req.body;
    const {profilePic,location,category,language}=req.user
    const status='pending'    
    console.log('id is ',userID)
    try {
        const campaign = await Campaign.findById(campaignId);
        console.log("found ",campaign)
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }       
            // Add new applicant
        campaign.applicants.push({ userID, name, status,profilePic,location,category,language });      
        await campaign.save();
        console.log("newcampaign",campaign)
        res.status(200).json({ message: 'Applicant updated successfully', campaign });
    } catch (error) {
        console.log("error",error)
        res.status(500).json({ message: 'An error occurred', error });
    }
  })
  
router.get("/appliedcampaigns/:userID",async function (req, res) {
    console.log("here in ac")
    const { userID } = req.params;
    console.log("userID",userID)
    try {    
        // Query to find campaigns where the applicant's ID is present
        const campaigns = await Campaign.find({
            applicants: {
                $elemMatch: {userID}
            }
        }).sort({ deadline: -1 })

        console.log("campaigns are ",campaigns)
        if (campaigns.length === 0) {
            return res.status(404).json({ message: 'No campaigns found for the given applicant ID' });
        }
        res.json({campaigns});
    } catch (error) {
        console.error('Error finding campaigns:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}) 


router.post('/chat',async function (req, res) {
  const {fromID,toID,toName,toPic,message}= req.body
  const newObjectId = new mongoose.Types.ObjectId()
  try {
      const result = await User.findOneAndUpdate(
      { 
        _id: fromID, 
        'conversations.withUserID': toID 
      }, // Find the brand and check if the conversation already exists
      {
        $set: {
          'conversations.$.lastMessage': message,
          'conversations.$.lastMessageTimestamp': Date.now(),
          'conversations.$.withUserPic': toPic,
          'conversations.$.withUserName': toName,
        }
      },
      { 
        new: true, 
        upsert: false // Create a new conversation if it doesn't exist
      }
    )   
    if (!result) {
      // If the conversation doesn't exist, push a new one
      const user = await User.findById(fromID);
      const conversation={ 
        conversationID: newObjectId,
        withUserID: toID,
        withUserName: toName,
        withUserPic: toPic,
        lastMessage: message,
        lastMessageTimestamp: Date.now()
      }
      user.conversations.push(conversation);
      await user.save();
      console.log('New conversation added:', conversation);
    } else {
      console.log('Conversation updated:', result);
    }
    const userresult = await Brand.findOneAndUpdate(
      { 
        _id: toID, 
        'conversations.withUserID': fromID 
      }, // Find the brand and check if the conversation already exists
      {
        $set: {
          'conversations.$.lastMessage': message,
          'conversations.$.lastMessageTimestamp': Date.now(),
          'conversations.$.withUserPic': req.user.profilePic,
          'conversations.$.withUserName': req.user.name
        }
      },
      { 
        new: true, 
        upsert: false // Create a new conversation if it doesn't exist
      }
    ) 

    if (!userresult) {
      // If the conversation doesn't exist, push a new one
      const brand = await Brand.findById(toID);
      const conversation={ 
        conversationID: newObjectId,
        withUserID: fromID,
        withUserName: req.user.name,
        withUserPic: req.user.profilePic,
        lastMessage: message,
        lastMessageTimestamp: Date.now()
      }
      brand.conversations.push(conversation);
      await brand.save();
      console.log('New conversation added:', conversation);
    } else {
      console.log('Conversation updated:', userresult);
    }
    const timestamp=Date.now()
      const chat={fromID,toID,message,timestamp}
      console.log("chat is ",chat)
      Chat.create(chat)
      .then((createdChat) => {
        res.status(201).json(createdChat);  // Respond with the created brand
      })

  } catch (error) {
    console.error('Error adding or updating conversation:', error);
  }

})


  router.post('/chatmessages',async function (req, res) {
    const {user1ID,user2ID}= req.body
    console.log("IDs are ",user1ID,user2ID)
    try {
      const messages = await Chat.find({
        $or: [
          { fromID: user1ID, toID: user2ID },
          { fromID: user2ID, toID: user1ID }
        ]
      }).sort({ timestamp: 1 }); // Sort by timestamp ascending
  
      res.status(200).json({messages});
      console.log("messages are ",messages)
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  
  })

module.exports=router;