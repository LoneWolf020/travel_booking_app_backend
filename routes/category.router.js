const express = require("express");
const router = express.Router();

const Category = require("../model/category.model");

router.route("/")
    .get(async (req, res) => {
        try {
            const categories = await Category.find({});
            categories ? res.json(categories) : res.status(404).json({message : "Category Data not Found"});
        } catch (error) {
            console.log(error);
        }
    })

module.exports = router;    