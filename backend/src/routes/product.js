const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const multer = require("multer");
const Product = require("../models/product");
const Category = require("../models/category");
const path = require("path");
const shortid = require("shortid");
const {
  requireSignedIn,
  adminMiddleWare,
  userMiddleWare,
} = require("../middlewares");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/product/create",
  upload.array("productPicture"),
  requireSignedIn,
  adminMiddleWare,
  (req, res) => {
    const { name, description, quantity, price, category } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const newProduct = new Product({
      name,
      description,
      quantity,
      price,
      slug: slugify(name),
      category,
      createdBy: req.user._id,
      productPictures,
    });

    newProduct.save(async (err, createdProduct) => {
      if (err) {
        return console.log(err);
      }
      const products = await Product.find({ _id: createdProduct._id })
        .populate("category")
        .exec();
      res.json({ product: products });
    });
  }
);

//!NOTE FETCH PRODUCTS AND FETCH ACCORDING TO PRICE

router.get("/products/:slug", (req, res) => {
  const { slug } = req.params;

  Category.findOne({ slug: slug })
    .select("_id")
    .exec((err, foundCategory) => {
      if (err) {
        return res.status(400).json("error ");
      }
      if (foundCategory) {
        Product.find({ category: foundCategory._id }).exec((err, products) => {
          if (err) {
            return res.status(400).json("error ");
          }
          res.status(200).json({
            products: products,
            productsByPrice: {
              productsBelow5k: products.filter(
                (product) => product.price <= 5000
              ),
              productsBelow15k: products.filter(
                (product) => product.price >= 5000 && product.price <= 15000
              ),
              productsBelow25k: products.filter(
                (product) => product.price >= 15000 && product.price <= 25000
              ),
              productsBelow35k: products.filter(
                (product) => product.price >= 25000 && product.price <= 35000
              ),
              productsAbove35k: products.filter(
                (product) => product.price > 35000
              ),
            },
          });
        });
      } else {
        res.status(400).json("error");
      }
    });
});

//!NOTE FETCH PRODUCT BY ID

router.get(
  "/product/:productId",
  requireSignedIn,
  userMiddleWare,
  (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    if (typeof productId !== "undefined" || productId !== null) {
      Product.findOne({ _id: productId }, (err, foundProd) => {
        console.log(foundProd);
        if (err) {
          return res.status(200).json({ message: err });
        }
        if (foundProd) {
          return res.status(200).json({ product: foundProd });
        } else {
          return res.status(200).json({ message: "Product not found" });
        }
      });
    } else {
      return res.status(200).json({ message: "No id matched" });
    }
  }
);

module.exports = router;
