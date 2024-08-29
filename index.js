require('dotenv').config()
const app = require("express")()
const App=require('./api/App')
const cors = require('cors');
bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
var session = require('express-session');
// const passport = require("passport")
const MongoStore = require('connect-mongo');
const passport = require('./api/utils/passport'); // Import passport configuration
require("./api/config/connectdb")
app.set('trust proxy', 1); // Trust the first proxy in front of the app
const corsOptions = {
  origin: ['https://www.adlour.com','http://localhost:5173'],//(https://your-client-app.com)
  credentials: true
};
// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '5mb' }));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//Middleware
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: false ,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://aravi03:522000@mycluster.zubd5uc.mongodb.net/adlour?retryWrites=true&w=majority"
}),cookie: {
  secure: true, // Set to true if using HTTPS
  httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  sameSite: 'Strict', // Adjust based on your needs, e.g., 'Strict' or 'None'
}
}))


app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"
app.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

app.use(cors(corsOptions));
app.get('/test',function(req,res){
  res.send("App is working")
})
app.use('/api',App)
const server = app.listen(process.env.PORT || 5000, function () {
const port = server.address().port
  console.log("App started at port:", port)
})
// Serve static files from brandpage
app.use('/', express.static(path.join(__dirname, 'brandpage')));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'brandpage', 'index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
