var YoutubeV3Strategy = require('passport-youtube-v3').Strategy

passport.use(new YoutubeV3Strategy({
        clientID: YOUTUBE_APP_ID,
        clientSecret: YOUTUBE_APP_SECRET,
        callbackURL: "http://localhost:5000/api/user/youtube/link/callback",
        scope: ['https://www.googleapis.com/auth/youtube.readonly'],
        authorizationParams: {
            access_type: 'offline'
        }
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("profile is ",profile)
    }
));