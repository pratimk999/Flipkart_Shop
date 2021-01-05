const express = require("express");
const router = express.Router();
const Page = require("../../models/page");
const path = require("path");
const shortid = require("shortid");
const multer = require("multer");
const { requireSignedIn, adminMiddleWare } = require("../../middlewares");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(path.dirname(__dirname)), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/admin/page/create",
  upload.fields([{ name: "banners" }, { name: "products" }]),
  requireSignedIn,
  adminMiddleWare,
  (req, res) => {
    // console.log(req.files);
    // console.log("INSIDE PAGE");
    if (req.files && req.files.length > 0) {
      const { banners, products } = req.files;
      // console.log(banners);
      // console.log(products);
      if (banners !== "undefined") {
        if (banners.length) {
          req.body.banners = banners.map((banner, index) => {
            return {
              img: `${process.env.IMAGE_API}/public/${banner.filename}`,
              navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            };
          });
        }
      }

      if (products !== "undefined") {
        if (products.length) {
          req.body.products = products.map((product, index) => {
            return {
              img: `${process.env.IMAGE_API}/public/${product.filename}`,
              navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            };
          });
        }
      }
    }
    req.body.createdBy = req.user._id;

    const newPage = new Page(req.body);

    newPage.save((err, result) => {
      if (err) {
        return res.status(400).json({ message: "something went wrong" });
      } else {
        res.status(200).json({ newPage: result });
      }
    });
  }
);

module.exports = router;
