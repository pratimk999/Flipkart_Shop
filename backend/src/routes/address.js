const express = require("express");
const router = express.Router();
const address = require("../models/address");
const UserAddress = require("../models/address");
const { requireSignedIn, userMiddleWare } = require("../middlewares/index");

router.post(
  "/user/address/create",
  requireSignedIn,
  userMiddleWare,
  (req, res) => {
    //return res.status(200).json({body: req.body})
    const { payload } = req.body;
    if (payload.address) {
      if (payload.address._id) {
        UserAddress.findOneAndUpdate(
          { user: req.user._id, "address._id": payload.address._id },
          {
            $set: {
              "address.$": payload.address,
            },
          }
        ).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          if (address) {
            res.status(201).json({ address });
          }
        });
      } else {
        UserAddress.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              address: payload.address,
            },
          },
          { new: true, upsert: true }
        ).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          if (address) {
            res.status(201).json({ address });
          }
        });
      }
    } else {
      res.status(400).json({ error: "Params address required" });
    }
  }
);
router.post("/user/getaddress", requireSignedIn, userMiddleWare, (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
});

module.exports = router;
