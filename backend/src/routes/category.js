const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const slugify = require("slugify");
const path = require("path");
const shortid = require("shortid");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//!NOTE CATEGORY CREATE ROUTE

router.post("/category/create", upload.single("categoryImage"), (req, res) => {
  Category.findOne({ name: req.body.name }, (err, foundCategory) => {
    if (foundCategory) {
      return res.send("Category already exists");
    }
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.file) {
      categoryObj.categoryImage =
        process.env.IMAGE_API + "/public/" + req.file.filename;
    }

    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

    const newCategory = new Category(categoryObj);
    newCategory.save((err, newlyCreatedCategory) => {
      if (err) {
        return res.send(err);
      }
      res.json({ createdCategory: newlyCreatedCategory });
    });
  });
});

//!NOTE RECURSIVE FUNCTION TO FETCH CHILD CATEGORIES

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
      children: getCategories(categories, categoryItem._id),
    });
  }

  return allCategoriesList;
}

//!NOTE CATEGORY FETCH ROUTE
router.get("/category", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      return console.log(err);
    }

    const allCategories = getCategories(categories);

    res.json({ Categories: allCategories });
  });
});

router.post(
  "/category/update",
  upload.array("categoryImage"),
  async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategoriesArray = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        if (type[i] === "undefined") {
          type[i] = "productList";
        }
        const _updatedCategory = {
          name: name[i],
          type: type[i],
          slug: slugify(name[i]),
        };
        if (parentId[i] !== "") {
          _updatedCategory.parentId = parentId[i];
        }

        const updatedCategory = await Category.findOneAndUpdate(
          { _id: _id[i] },
          _updatedCategory,
          { new: true }
        );

        updatedCategoriesArray.push(updatedCategory);
      }
      return res
        .status(200)
        .json({ updatedCategories: updatedCategoriesArray });
    } else {
      const _updatedCategory = {
        name: name,
        slug: slugify(name),
        type: type,
      };
      if (parentId !== "") {
        _updatedCategory.parentId = parentId;
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id },
        _updatedCategory,
        { new: true }
      );
      return res.status(200).json({ updatedCategories: updatedCategory });
    }
  }
);

module.exports = router;
