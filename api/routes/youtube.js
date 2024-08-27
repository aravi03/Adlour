var express = require('express');
var router = express.Router();


const clientID='377344164120-v9vk7n9rt004968cr1es3afn775kkdpu.apps.googleusercontent.com'
const clientSecret= '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'
const callbackURL= "http://localhost:5000/user/youtube/link/callback"
const passReqToCallback  =true
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(clientID,clientSecret, callbackURL);

router.get("/youtube/link",function (req, res) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    res.redirect(authUrl);
  })
  router.get("/youtube/link/callback",async function (req, res) {
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
              const filter = { email: req.user.email };
              const update = { channelLink: channelUrl };
  
               const doc=await User.findOneAndUpdate(filter,update,{
                new: true
              });
              console.log("doc is ",doc);
              console.log("req is ",req.user)
              res.send(`This email ${req.user.email} channel has ${subscriberCount} subscribers, ${channel.statistics.viewCount} views, link is ${channelUrl}, name is ${channelName} `);
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
  })
  module.exports=router;