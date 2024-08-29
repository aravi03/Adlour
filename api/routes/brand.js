var express = require('express')
var router = express.Router()
const Brand = require("../models/Brand")
const Campaign = require("../models/Campaign")
const User = require("../models/User")
const Chat = require("../models/Chat")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types  // Import ObjectId if needed

router.post("/update/:brandID",async function (req, res) {
  try{
    var {brandID}=req.params
    brandID= new ObjectId(brandID)  
    const filter = { _id: brandID };
    const {name,website,category,location,description}=req.body
    const update = {name,website,category,location,description}
    console.log(brandID,update)
    const doc=await Brand.findOneAndUpdate(filter,update)
    console.log(doc)
    res.json({'brand':doc})
  }
  catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
  })

  router.post("/updatepic/:brandID",async function (req, res) {
    try{
      var {brandID}=req.params
      brandID= new ObjectId(brandID)  
      const filter = { _id: brandID };
      const {profilePic}=req.body
      const update = {profilePic}
      console.log(brandID,update)
      const doc=await Brand.findOneAndUpdate(filter,update)
      console.log(doc)
      res.json({'brand':doc})
    }
    catch(err){
      console.error('Error finding campaigns by author:', err);
      res.send("Error occured")
    }  
    })

router.get("/viewcampaign/:id",async function (req, res) {
  try{
  const id=req.params.id
  const campaign= await Campaign.findById(id)
  console.log("Campaign is ",campaign)
  res.json({campaign})
}
catch(err){
  console.error('Error finding campaigns by author:', err);
  res.send("Error occured")
}  
})

router.post("/searchcreators",async function (req, res) {
  try{
  const name = req.body.query
    const docs=await User.find(
        { "name": { "$regex": name, "$options": "i" }})    
    console.log(docs)
    res.json({creators:docs})
  }
  catch(err){
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  }  
})

router.get("/viewcreator/:id",async function (req, res) {
  try{
  const id=req.params.id
  const user= await User.findById(id)
  console.log("User is ",user)
  res.json({user})
}
catch(err){
  console.error('Error finding campaigns by author:', err);
  res.send("Error occured")
}  
})

router.get("/mycampaigns/:id",async function (req, res) {
  const author=req.params.id
  Campaign.find({ author: author }).sort({ deadline: -1 })
  .then(campaigns => {
    console.log('Campaigns by author:', campaigns);
    res.json({campaigns})
  })
  .catch(err => {
    console.error('Error finding campaigns by author:', err);
    res.send("Error occured")
  });
})

router.post("/createcampaign/:id",async function (req, res) {
  const author=req.params.id
  const {name,category,language,location,deadline,description}= req.body
  const profilePic=req.user.profilePic
  const campaign={name,category,language,location,deadline,description,author,profilePic}
    console.log('campaign is ',campaign)
    Campaign.create(campaign)
    .then((createdCampaign) => {
      res.status(201).json(createdCampaign);  // Respond with the created brand
    })
    .catch((error) => {
      console.error("Error creating brand:", error);
      res.status(500).json({ message: "Failed to create campaign", error });
    });
}) 

router.post('/chat',async function (req, res) {
  const {fromID,toID,toName,toPic,message}= req.body
  const newObjectId = new mongoose.Types.ObjectId()
  try {
      const result = await Brand.findOneAndUpdate(
      { 
        _id: fromID, 
        'conversations.withUserID': toID 
      }, // Find the brand and check if the conversation already exists
      {
        $set: {
          'conversations.$.lastMessage': message,
          'conversations.$.lastMessageTimestamp': Date.now(),
          'conversations.$.withUserPic': toPic,
          'conversations.$.withUserName': toName
        }
      },
      { 
        new: true, 
        upsert: false // Create a new conversation if it doesn't exist
      }
    )   
    if (!result) {
      // If the conversation doesn't exist, push a new one
      const brand = await Brand.findById(fromID);
      const conversation={ 
        conversationID: newObjectId,
        withUserID: toID,
        withUserName: toName,
        withUserPic: toPic,
        lastMessage: message,
        lastMessageTimestamp: Date.now()
      }
      brand.conversations.push(conversation);
      await brand.save();
      console.log('New conversation added:', conversation);
    } else {
      console.log('Conversation updated:', result);
    }
    const userresult = await User.findOneAndUpdate(
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
      const user = await User.findById(toID);
      const conversation={ 
        conversationID: newObjectId,
        withUserID: fromID,
        withUserName: req.user.name,
        withUserPic: req.user.profilePic,
        lastMessage: message,
        lastMessageTimestamp: Date.now()
      }
      user.conversations.push(conversation);
      await user.save();
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