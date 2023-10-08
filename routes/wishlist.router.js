const express = require("express");
const WishList = require("../model/wishlist.model");
const verifyUser = require("../middleware/verifyuser");

const router = express.Router();

router.route("/")
    .post(verifyUser, async (req, res) => {
        const newWishList = new WishList(req.body);
        try {
            const savedWishList = await newWishList.save();
            res.status(201).json(savedWishList);
        } catch (error) {
            res.status(500).json({message: "Wishlist not Created"});
        }
    })


router.route("/")
    .delete(verifyUser, async (req, res) => {
        try {
            await WishList.findByIdAndDelete(req.params.id);
            res.json({message: "Deleted from WishList"});
        } catch (error) {
            res.status(500).json({messsage: "Can't Delete from WishList"});
        }
    })    


router.route("/")
    .get(verifyUser, async (req, res) => {
        try {
            const wishlist = await WishList.find({});
            wishlist ? res.json(wishlist) : res.json({message: "No item found in wishlist"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Couldn't get the wishlist"});
        }
    })    


module.exports = router;    