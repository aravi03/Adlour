const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Brand = require("../models/Brand");

//Called during login/sign up.
passport.use('localBrand',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // Match this with your form field
},Brand.authenticate()));

// passport.serializeUser((brand, done) => {done(null, brand)})
// passport.deserializeUser(async (brand, done) => {
//     console.log("here ",brand._id)
//   const brand = await Brand.findOne({ _id: brand._id })
//     if (!newbrand) done(null, false); // no user found
//     console.log("newuser ",newbrand)
//     done(null, newbrand);
// }) 