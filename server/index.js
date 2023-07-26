// app.js (or server.js)
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// MongoDB setup (replace YOUR_MONGODB_URL with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://sanjayacharya992:san123@cluster0.nidiiyb.mongodb.net/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log('db Connected')).catch((e)=>console.log(e))

// User model (adjust the fields as per your requirements)
const User = mongoose.model('UserLinkedin', {
    linkedinId: { type: String },
  firstName: String,
  lastName: String,
  email: String,
});

// Passport setup
app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: 'sec',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


// passport.use(new LinkedInStrategy({
//   clientID: '77bwq4u9ladh78',
//   clientSecret: 'oDYdgI9Q7idcilNn',
//   callbackURL: 'http://localhost:5000/auth/linkedin/callback',
//   scope: ['r_liteprofile', 'r_emailaddress'],
// },
// async (accessToken, refreshToken, profile, done) => {
//   // Check if the user already exists in the database, otherwise create a new user

//   try {
//     const exist = await User.findOne({linkedinId: profile.id})
//   console.log(exist)
//   if(!exist){
//     const newUser = await User.create({
//       linkedinId: profile.id,
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       email: profile.emails ? profile.emails[0].value : null,
//       // Map other fields from the LinkedIn profile if needed
//     })
//     console.log('refreshToken:',refreshToken,'accessToken:',accessToken)


//     return done(newUser)
//   }else{
//     console.log('User exist')
//     console.log('refreshToken:',refreshToken,'accessToken:',accessToken)

//     return done(exist)

//   }
//   } catch (error) {
//     console.log('User exist')
//     return done(error)

//   }

// }));



passport.use(new LinkedInStrategy({
  clientID: '77bwq4u9ladh78',
  clientSecret: 'oDYdgI9Q7idcilNn',
  callbackURL: "http://localhost:5000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true
}, 
async (accessToken, refreshToken, profile, done) => {
  // Check if the user already exists in the database, otherwise create a new user

  try {
    const exist = await User.findOne({linkedinId: profile.id})
  console.log(exist)
  if(!exist){
    const newUser = await User.create({
      linkedinId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails ? profile.emails[0].value : null,
      // Map other fields from the LinkedIn profile if needed
    })
    console.log('refreshToken:',refreshToken,'accessToken:',accessToken)


    return done(newUser)
  }else{
    console.log('User exist')
    console.log('refreshToken:',refreshToken,'accessToken:',accessToken)

    return done(exist)

  }
  } catch (error) {
    console.log('User exist')
    return done(error)

  }
}
))


passport.serializeUser((user, done) => {
  console.log('serializeUser',user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log('deserializeUser',user)
    done(err, user);
  });
});

// LinkedIn login route
app.get('/auth/linkedin', passport.authenticate('linkedin'));

// LinkedIn callback route
app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the frontend React app after successful login
    res.redirect('http://localhost:5173');
  }
);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
