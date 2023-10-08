const express = require('express');

const Category = require("../model/category.model");
const categories = require("../data/categories");

const router = express.Router();

router.route("/")
    .post(async (req, res) => {
        try {
            const categoriesforDB = await Category.insertMany(categories.data);
            res.json("Categories added successfully");
        } catch (error) {
            console.log(error);
            res.json({message: "Could not add categories to DB"});
        }
    })

    module.exports = router;