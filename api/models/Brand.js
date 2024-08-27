const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const Brand = new Schema({
  email: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  coverPic: {
    type: String,
    default: "",
  },
  category:{
    type: String,
    default: "",
  },
  accountType:{
    type: String,
    default: "brand",
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
  ]
})
Brand.plugin(passportLocalMongoose,{ usernameField: 'email' })

module.exports = mongoose.model("Brand", Brand)
