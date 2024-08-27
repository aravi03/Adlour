const mongoose = require("mongoose");
const url = "mongodb+srv://aravi03:522000@mycluster.zubd5uc.mongodb.net/adlour?retryWrites=true&w=majority";
const connect = mongoose.connect(url);
connect
  .then(db => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log(err)
  });