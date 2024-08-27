// authMiddleware.js

function checkAuthenticated(req, res, next) {
  console.log("auth is ",req.isAuthenticated())
  console.log(req.user)
    if (req.isAuthenticated()) {
      return next(); // If the user is authenticated, proceed to the next middleware/route handler
    }
    console.log("redirecting")
    res.redirect("http://localhost:5173/creator/login"); // Otherwise, redirect to the login page
  }
 
  
  module.exports = checkAuthenticated;
  