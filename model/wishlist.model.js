const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    hotelId: {type: String, required: true}
})

const WishList = mongoose.model("wishList", wishlistSchema);

module.exports = WishList;