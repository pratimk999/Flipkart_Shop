const express = require("express");
const { isUserAuthenticated } = require("../../middlewares");
const router = express.Router();
const Category = require("../../models/category");
const Product = require("../../models/product");

function getCategories(categories, parentId = null) {
  const allCategoriesList = [];
  let category;

  if (parentId == null) {
    category = categories.filter(
      (singleItem) => singleItem.parentId == undefined
    );
  } else {
    category = categories.filter(
      (singleItem) => singleItem.parentId == parentId
    );
  }

  for (let categoryItem of category) {
    allCategoriesList.push({
      _id: categoryItem._id,
      name: categoryItem.name,
      slug: categoryItem.slug,
      parentId: categoryItem.parentId,
      type: categoryItem.type,
      children: getCategories(categories, categoryItem._id),
    });
  }

  return allCategoriesList;
}

//!NOTE USE MIDDLEWARE

// isUserAuthenticated
router.post("/initialData", async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({}).populate("category").exec();

  res.json({ allCategories: getCategories(categories), allProducts: products });
});

module.exports = router;
