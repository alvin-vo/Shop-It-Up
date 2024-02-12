const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '1005337001636-7bpm9ohobj26vvvm3bg57tlftqf7nmln.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback", // TODO
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  // return done(null, profile);
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

async function authorize(userId) {
  const authenticated = user.find(userId);
  if (authenticated === null) {
    console.error('user not authenticated');
  } else {
    return userId;
  }
}