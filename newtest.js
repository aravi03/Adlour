const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser'); 
const client_id="377344164120-v9vk7n9rt004968cr1es3afn775kkdpu.apps.googleusercontent.com"
const client_secret="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"
const redirect_uri="http://localhost:5000/api/user/youtube/link/callback"
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }));

  
app.use(cookieParser());
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

app.get('/', (req, res) => {
  res.send('<a href="/auth">Login with Google</a>');
});

app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

app.get('/api/user/youtube/link/callback', async (req, res) => {
  const { code } = req.query;
  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log("code is ",tokens)
      oauth2Client.setCredentials(tokens);
      req.session.tokens = tokens;
      console.log("session is ",req.session.tokens)
      console.log("here",req.session.tokens)
      //   if (!req.session.tokens) {
      //     return res.redirect('/');
      //   }
        oauth2Client.setCredentials(req.session.tokens);
        const service = google.youtube('v3');
        try {
          const response = await service.channels.list({
            auth: oauth2Client,
            part: 'contentDetails,snippet,statistics,status,topicDetails,brandingSettings,contentOwnerDetails,localizations',
            mine: true,
          });
          console.log("data is ",response.data.items)
          const channels = response.data.items;
          if (channels.length === 0) {
            res.send('No channel found.');
          } else {
            const channel = channels[0];
            const channelUrl = `https://www.youtube.com/channel/${channel.id}`;
            const channelName = channel.snippet.title;
            const subscriberCount = channel.statistics.subscriberCount;
            const viewCount = channel.statistics.viewCount;            
            console.log('thumbnail',channel.snippet.thumbnails)
            console.log(channel.snippet.localized)
            console.log(channel.brandingSettings.channel)
            console.log(channel.contentDetails.relatedPlaylists)

            res.send(`This channel has ${subscriberCount} subscribers, ${channel.statistics.viewCount} views, link is ${channelUrl}, name is ${channelName} `);
          }
        } catch (err) {
          console.error('The API returned an error:', err);
          res.send('Error fetching subscriber count.');
        }
    } catch (err) {
      console.error('Error retrieving access token', err);
      res.send('Error retrieving access token');
    }
  }
});

app.get('/subscribers', async (req, res) => {
    
});

// app.use((req, res, next) => {
//   res.locals.session = req.session;
//   next();
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
