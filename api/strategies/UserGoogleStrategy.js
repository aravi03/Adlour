var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const User = require("../models/User");
const passport = require("passport")

passport.use('googleUser',new GoogleStrategy({
    clientID:'377344164120-v9vk7n9rt004968cr1es3afn775kkdpu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/api/user/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log("from google fn",profile)
    const user=await User.findOne({email:profile.emails[0].value});
    console.log("passport user is ",user)
    if(user)     return done(null, user);
    else {
      const user= await User.create({
        email:profile.emails[0].value,
        name:profile.displayName,
        profilePic:profile.photos[0].value
      })
      return done(null, user);
    }
}
))

// passport.serializeUser((user, done) => {done(null, user)})
// passport.deserializeUser(async (user, done) => {
//   const newuser = await User.findOne({ _id: user._id })
//     if (!newuser) done(null, false); // no user found
//     done(null, newuser);
// }) 
