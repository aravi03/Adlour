const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Campaign = new Schema({
  name: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
  profilePic: {
    type: String,
    default: "",
  },
  coverPic: {
    type: String,
    default: "",
  },
  applicants: [
    {
        userID: String,
        name: String,
        status: String,
        category: String,
        language: String,
        location: String,
        profilePic: String
    }
  ]
})

module.exports = mongoose.model("Campaign", Campaign)
