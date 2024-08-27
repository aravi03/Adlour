const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const CALLBACK_URL_LOGIN = 'http://localhost:3000/auth/google/callback';
const CALLBACK_URL_LINK = 'http://localhost:3000/auth/google/link/callback';

app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure Passport for Google OAuth for login
passport.use('google-login', new GoogleStrategy({
    clientID:'377344164120-v9vk7n9rt004968cr1es3afn775kkdpu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/brand/google/callback",
    passReqToCallback   : true
},
(req, accessToken, refreshToken, profile, done) => {
  // You can access the request object here
//   console.log('Login callback, request object:', req);
  return done(null, { profile, accessToken });
}));

// Configure Passport for Google OAuth for account linking
passport.use('google-link', new GoogleStrategy({
    clientID:'377344164120-v9vk7n9rt004968cr1es3afn775kkdpu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/brand/google/callback",
    passReqToCallback   : true
},
(req, accessToken, refreshToken, profile, done) => {
  // You can access the request object here
//   console.log('Linking callback, request object:', req);
  return done(null, { profile, accessToken });
}));

// Route for initiating Google OAuth login
app.get('/auth/google', passport.authenticate('google-login', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly']
}));

// OAuth callback URL for login
app.get('/brand/google/callback', passport.authenticate('google-login', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/profile');
});

// Route for initiating Google OAuth for account linking
app.get('/auth/google/link', passport.authenticate('google-link', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly']
}));

// OAuth callback URL for account linking
app.get('/auth/google/link/callback', passport.authenticate('google-link', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/account');
});

// Route to display YouTube channel info
app.get('/profile', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }

  const accessToken = req.user.accessToken;
  const { google } = require('googleapis');
  const youtube = google.youtube({ version: 'v3', auth: accessToken });

  try {
    const response = await youtube.channels.list({
      part: 'snippet,statistics',
      mine: true,
    });

    if (response.data.items.length === 0) {
      return res.send('No channel found for this user.');
    }

    const channel = response.data.items[0];
    const channelId = channel.id;
    const channelName = channel.snippet.title;
    const subscriberCount = channel.statistics.subscriberCount;

    res.send(`
      <h1>Channel Information</h1>
      <p>Channel ID: ${channelId}</p>
      <p>Channel Name: ${channelName}</p>
      <p>Subscriber Count: ${subscriberCount}</p>
    `);
  } catch (err) {
    console.error('Error fetching YouTube channel info:', err);
    res.redirect('/');
  }
});

// Route to handle account linking
app.get('/account', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google/link');
  }

  res.send('Account linking successful.');
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
