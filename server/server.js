// server.js

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const cors = require("cors");
const app = express();
const User = require("./db/userSchema");
const Manualuser = require("./db/manualUser");
require("./db/db");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const UserPost = require("./db/userPost");
const cloudinary = require("cloudinary").v2;
const axios = require('axios')

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST",
  })
);

// Set up session middleware
app.use(
  session({
    secret: "sec", // Replace with your secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
cloudinary.config({
  cloud_name: "dk1jjppkk",
  api_secret: "3I7pCkcd8ZXutlhEJQJqaTAByYA",
  api_key: "732113818452973",
});

const upload = multer({ storage: multer.diskStorage({}) });


// Replace these with your actual Google OAuth credentials
const GOOGLE_CLIENT_ID =
  "444451465392-m7b6tl3a1bl00gjvrqhapl92ictsrgp4.apps.googleusercontent.com";
const LINKEDIN_CLIENT_ID = "77bcey357f6zzs";
const GOOGLE_CLIENT_SECRET = "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";
const LINKEDIN_CLIENT_SECRET = "W9y2fDTNfR97i6Jh";

// Passport.js configuration
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

let accToken = ""

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessTok:",accessToken,"refresh:",refreshToken)
      accToken = accToken+accessToken;
      console.log(accToken)
      // console.log(
      //   profile.displayName,
      //   profile.name.familyName,
      //   profile.name.givenName,
      //   profile.photos[3]
      // );
      let findUserId = profile.id;
      const exist = await User.findOne({ id: findUserId });
      // console.log(exist)

      if (!exist) {
        console.log("not exist");
        const saveUser = await User.create({
          id: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          photos: profile.photos[3],
        });
        // console.log("saved to DB::", saveUser);
        return done(null, saveUser);
      } else {
        // console.log("exist profile", profile);
        return done(null, profile);
      }
    }
  )
);

console.log("acc::::::::undefine",accToken)
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessTok:",accessToken,"refresh:",refreshToken)
      // console.log(profile.emails[0].value)
      let findUserId = profile.id;
      const exist = await User.findOne({ id: findUserId });
      // console.log(exist)

      if (!exist) {
        console.log("not exist");
        const saveUser = await User.create({
          id: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          emails: profile.emails[0].value,
          photos: profile.photos,
          provider: profile.provider,
        });
        console.log("saved to DB::", saveUser);
        return done(null, saveUser);
      } else {
        console.log("exist profile", profile);
        return done(null, profile);
      }
    }
  )
);

// Routes for authentication
app.get("/auth/linkedin", passport.authenticate("linkedin", { state: "SOME STATE" }));

app.get("/auth/linkedin/callback", passport.authenticate("linkedin", { failureRedirect: "/login" }),
  (req, res) => {
    // Handle successful authentication and redirect the user to the appropriate page.
    res.redirect("http://localhost:5173");
    // var data = 'san'
    // res.json({message:data});
  }
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Handle successful authentication and redirect the user to the appropriate page.
    res.redirect("http://localhost:5173");
    // res.json('test working')
  }
);

app.get("/", (req, res) => {
  // console.log(req.cookies);
  const user = req.user;
  // console.log("user::::",user);
  // const accTok = req.user.accessToken;
  // console.log('accTok', accTok)
  res.json({ user: user});
});

app.get("/logout", function (req, res, next) {
  res.clearCookie();
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/");
  });
});

app.post("/normalUserLogout", function (req, res, next) {
  const cook = req.cookies;
  console.log(cook);
  res.clearCookie("token", new Date(0));
  res.status(202).json(cook);
});

app.get("/normalUserGet", async (req, res) => {
  const { token } = req.cookies;
  console.log("167:", token);

  try {
    if (token) {
      console.log("171:::", token);
      const jwtVerify = jwt.verify(token, "sec");
      console.log("vrify", jwtVerify);
     return res.status(203).json(jwtVerify);
    } else {
     return res.status(403).json("token not valid");
    }
  } catch (error) {
    console.log(error);
   return res.status(403).json(error);
  }
});

app.post("/userLogin", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const emailExist = await Manualuser.findOne({ email: email });
  console.log(emailExist);

  try {
    if (emailExist) {
      console.log("registered");
      const passMatch = emailExist.password === password;
      if (passMatch) {
        const jwtSign = jwt.sign(
          {
            id: emailExist._id,
            userName: emailExist.userName,
            email: emailExist.email,
            firstName: emailExist.firstName,
            lastName: emailExist.lastName,
          },
          "sec"
        );
        res.cookie("token", jwtSign,
        {
          sameSite: 'none',
          secure: true,
      });
        console.log("jwtSign", jwtSign);
        res.status(203).json(emailExist);
      } else {
        return res.status(405).json("worng password");
      }
    } else {
      res.status(403).json("email not registered");
    }
  } catch (error) {
    console.log(error);
    return res.status(409).json(error);
  }
});

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const { userName, firstName, lastName, email, password } = req.body;
  const emailExist = await Manualuser.findOne({ email: email });
  console.log(emailExist);

  try {
    if (emailExist) {
      console.log("already registered");
      res.status(403).json(emailExist);
    } else {
      const saveUser = await Manualuser.create({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      console.log("saved", saveUser);
      res.status(202).json(saveUser);
    }
  } catch (error) {
    console.log(error);
    res.status(409).json(error);
  }
});

// user Post
app.post("/userPost", upload.single("files"), async (req, res) => {
  const { path } = req.file;
  // console.log(req.file)
  const { blog } = req.body;
  console.log("blog", blog);
  const { token } = req.cookies;
  // console.log(token);

  const result = await cloudinary.uploader.upload(path, {folder : "argon" });
  // console.log(result)
  const jwtVerify = jwt.verify(token, "sec");
  console.log("jwtVerify", jwtVerify);
  try {
    const saveUserPost = await UserPost.create({
      UserName: jwtVerify.id,
      post: result.secure_url,
      blog: blog,
    });
    console.log("saveUserPost", saveUserPost);
    return res.status(201).json(saveUserPost);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
});

app.get("/getManualUserData", async (req, res) => {
  const {token} =req.cookies;

  try {

    const getPost = await UserPost.find();
    console.log("getPost", getPost);
    return res.status(201).json(getPost);
  } catch (error) {
    return res.status(401).json(error);
  }
});


// ----------------------LINKEDIN POST----------------------------------------------
const linkedInApiBaseUrl = 'https://api.linkedin.com/v2/';

// Route to handle content sharing
app.post('/share', (req, res) => {
  const { content } = req.body; // Assuming the content to be shared is sent in the request body
  // The access token obtained during the authentication process
  // const accessTok = req.user
  console.log('accessTok328:', accToken)
  // The data for the post
  const postData = {
    owner: `urn:li:person:${LINKEDIN_CLIENT_ID}`, // Replace with the LinkedIn User ID of the user
    text: {
      text: content,
    },
  };
  console.log("post",postData)
});



// --------------------------------------------------------------------



app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
