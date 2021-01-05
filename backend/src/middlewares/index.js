const jwt = require("jsonwebtoken");

exports.requireSignedIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

exports.adminMiddleWare = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(400).json({ message: "Admin access denied" });
  }
};

exports.userMiddleWare = (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    return res.status(400).json({ message: "user access denied" });
  }
};
