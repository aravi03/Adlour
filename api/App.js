var express = require('express');
var router = express.Router();
const MongoStore = require('connect-mongo');
const passport = require("passport")
var session = require('express-session');

const User = require("./models/User");
const userLoginRouter=require('./routes/userLogin')
const youtubeRouter=require('./routes/youtube')
const userRouter=require('./routes/user')
const brandLoginRouter=require('./routes/brandLogin')
const brandRouter=require('./routes/brand')

router.use("/user/auth",userLoginRouter);
// router.use("/user",youtubeRouter);
router.use("/user",userRouter);
router.use("/brand",brandRouter);
// router.use("/",brandRouter);
router.use("/brand/auth",brandLoginRouter);
module.exports=router;