const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), getChannelSubscribers);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile('token.json', (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.readonly'],
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile('token.json', JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', 'token.json');
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Get the subscriber count of the authenticated user's channel.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannelSubscribers(auth) {
  const service = google.youtube('v3');
  service.channels.list({
    auth: auth,
    part: 'statistics',
    mine: true,
  }, (err, response) => {
    if (err) return console.error('The API returned an error: ' + err);
    const channels = response.data.items;
    if (channels.length === 0) {
      console.log('No channel found.');
    } else {
      const channel = channels[0];
      console.log('This channel has %d subscribers.', channel.statistics.subscriberCount);
    }
  });
}
