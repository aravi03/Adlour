const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

//Called during login/sign up.
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // Match this with your form field
},User.authenticate()));

// passport.serializeUser((user, done) => {done(null, user)})
// passport.deserializeUser(async (user, done) => {
//     console.log("here ",user._id)
//   const newuser = await User.findOne({ _id: user._id })
//     if (!newuser) done(null, false); // no user found
//     console.log("newuser ",newuser)
//     done(null, newuser);
// }) 