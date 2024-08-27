const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const User = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: {
    type: String,
    default: "",
  },
  strategy: {
    type: String,
    default: "local",
  },
  channelLink: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  accountType:{
    type: String,
    default: "creator",
  },
  profilePic:{
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
  campaigns: [{
    campaignId: String,
    status: Boolean
  }],
  conversations: [
    {
      conversationID: String,
      withUserID: String,
      withUserName: String,
      withUserPic: String,
      lastMessage: String,
      lastMessageTimestamp: Date      
    }
  ]  
})

User.plugin(passportLocalMongoose,{ usernameField: 'email' })

module.exports = mongoose.model("User", User)
