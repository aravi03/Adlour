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
  channelLink: {
    type: String,
    default: "",
  },
  conversations: [
    {
      conversationID: String,
      withUserID: String,
      withUserName: String,
      withUserPic: String,
      lastMessage: String,
      lastMessageTimestamp: Date      
    }
  ],
  youtube:{
    channelLink: {
      type: String,
      default: "",
    },
    subscriberCount: {
      type: String,
      default: "",
    },
    viewCount: {
      type: String,
      default: "",
    },
    channelName:{
      type: String,
      default: ""
    },
    GoogleAccessToken:{
      type: String,
      default: ""
    },
  }  
})

User.plugin(passportLocalMongoose,{ usernameField: 'email' })

module.exports = mongoose.model("User", User)
