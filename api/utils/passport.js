const passport = require('passport');

// Load strategy files
require('../strategies/BrandGoogleStrategy');
require('../strategies/UserGoogleStrategy');
require('../strategies/LocalBrandsStrategy');
require('../strategies/LocalStrategy');

passport.serializeUser((user, done) => {
  console.log('serialize ', user)
  done(null, { id: user._id, type: user.constructor.modelName });
});

passport.deserializeUser(async (obj, done) => {
  try {
    const Model = obj.type === 'Brand' ? require('../models/Brand') : require('../models/User');
    const user = await Model.findById(obj.id);
    console.log('user from deserialize ',user)
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
