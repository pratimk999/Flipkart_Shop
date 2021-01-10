require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");

//!NOTE routes import
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const pageRoutes = require("./routes/adminRoutes/page");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/adminRoutes/initialData");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoutes = require("./routes/adminRoutes/orderRoutes");
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
app.use("/public/", express.static(path.join(__dirname, "uploads")));

//!NOTE routes configuration

app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(initialDataRoutes);
app.use(pageRoutes);
app.use(orderRoutes);
app.use(addressRoutes);
app.use(adminOrderRoutes);
app.use(adminRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
