require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require("path");
const User = require("./models/user");

//!NOTE routes import
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const pageRoutes = require("./routes/adminRoutes/page");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/adminRoutes/initialData");
const adminRoutes = require("./routes/adminRoutes/admin");

app.use(
  require("express-session")({
    secret: "Anything",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// !NOTE Passport js setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//!NOTE Mongodb setup

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("DATABASE CONNECTED");
});

mongoose.connection.on("error", () => {
  console.log("E R R O R");
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/", express.static(path.join(__dirname, "uploads")));

//!NOTE routes configuration

app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(initialDataRoutes);
app.use(pageRoutes);
app.use(adminRoutes);

// app.get("/", (req, res) => {
//   console.log(req.user);

//   if (req.isAuthenticated()) {
//     return res.send("You unlocked this");
//   }
//   res.send("You are not authenticated");
// });

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
