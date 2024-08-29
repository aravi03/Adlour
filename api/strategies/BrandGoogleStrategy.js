var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const Brand = require("../models/Brand");
const passport = require("passport")
const backendURL=`${process.env.BACKEND_URL}`  

passport.use('googleBrand',new GoogleStrategy({
    clientID:'377344164120-v9vk7n9rt004968cr1es3afn775kkdpu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: backendURL+"/api/brand/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log("from google fn",profile)
    const brand=await Brand.findOne({email:profile.emails[0].value});
    if(brand)     return done(null, brand);
    else {
      const brand= await Brand.create({
        email:profile.emails[0].value,
        name:profile.displayName,
        profilePic:profile.photos[0].value,
        strategy:'google'
      })
      return done(null, brand);
    }
}
))

// passport.serializeUser((brand, done) => {done(null, brand)})
// passport.deserializeUser(async (brand, done) => {
//   const newbrand = await Brand.findOne({ _id: brand._id })
//     if (!newbrand) done(null, false); // no user found
//     done(null, newbrand);
// }) 
