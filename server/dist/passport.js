// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./user/UserModel.js');
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({
      email
    });

    // If the user doesn't exist
    if (!user) {
      return done(null, false, {
        message: 'Invalid credentials'
      });
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password doesn't match
    if (!isMatch) {
      return done(null, false, {
        message: 'Invalid credentials'
      });
    }

    // If everything is successful, return the user
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});