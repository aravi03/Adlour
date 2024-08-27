const passport = require("passport")
const jwt = require("jsonwebtoken")
// const dev = process.env.NODE_ENV !== "production"
const dev = true

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: eval(60 * 60 * 24 * 30) * 1000,
  sameSite: "strict",
}

exports.getToken = user => {
  return jwt.sign(user, "aravi", {
    expiresIn: eval(60 * 15),
  })
}

exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, "aravi", {
    expiresIn: eval(60 * 60 * 24 * 30),
  })
  return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })
