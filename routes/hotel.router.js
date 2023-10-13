const express = require("express");
const router = express.Router();

const Hotel = require("../model/hotel.model")

router.route("/")
    .get(async (req, res) => {
        try {
            const hotels = await Hotel.find(req.query);
            hotels ? res.json(hotels) : res.status(404).json({msg: "No data Found"});
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router;    