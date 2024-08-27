const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Chat = new Schema({
  fromID: {
    type: String,
    default: "",
  },
  toID: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date, // Changed from String to Date
    default: Date.now, // Stores the current date and time by default
  }
})

module.exports = mongoose.model("Chat", Chat)
