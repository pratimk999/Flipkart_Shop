const express = require("express");
const { requireSignedIn, userMiddleWare } = require("../middlewares/index");
const router = express.Router();
const Cart = require("../models/cart");

//!NOTE ADD ITEMS TO CART ROUTE
router.post(
  "/user/cart/addToCart",
  requireSignedIn,
  userMiddleWare,
  (req, res) => {
    Cart.findOne({ user: req.user._id }, (err, foundCart) => {
      if (err) return console.log(err);

      if (foundCart) {
        console.log("foundcart - ", foundCart);
        const productItem = req.body.cartItems.product;

        let _index;
        const sameItem = foundCart.cartItems.find((item, index) => {
          if (
            item.product == productItem &&
            item.price == req.body.cartItems.price
          ) {
            _index = index;
            return item;
          }
        });
        let updatedCart = [];
        foundCart.cartItems.forEach((cartElement, index) => {
          if (index == _index) {
            cartElement.quantity += req.body.cartItems.quantity;
          }
          console.log(cartElement);
          updatedCart.push(cartElement);
        });
        console.log(updatedCart);

        if (sameItem) {
          Cart.findOneAndUpdate(
            {
              user: req.body.user,
              "cartItems.product": productItem,
            },
            {
              $set: {
                cartItems: [...updatedCart],
              },
            },
            (err, _cart) => {
              if (err) return console.log(err);
              return res.json({ updatedCart: _cart });
            }
          );
        } else {
          Cart.findOneAndUpdate(
            { user: req.body.user },
            {
              $push: {
                cartItems: req.body.cartItems,
              },
            },
            (err, _cart) => {
              if (err) return console.log(err);
              return res.json({ updatedCartAfterPush: _cart });
            }
          );
        }
      } else {
        const newCart = new Cart({
          user: req.body.user,
          cartItems: [req.body.cartItems],
        });

        newCart.save((err, _cart) => {
          if (err) return console.log(err);
          res.json({ cart: _cart });
        });
      }
    });
  }
);

module.exports = router;
