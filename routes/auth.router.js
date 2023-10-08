const express = require("express");
const User = require("../model/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/register")
    .post(async (req, res) => {
        try {
            const newUser = new User({
                username: req.body.username,
                number: req.body.number,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
            })
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({message: "Error creating User"});
            console.log(error);
        }
    })

router.route("/login")
    .post(async (req, res) => {
        try {
            const user = await User.findOne({number: req.body.number});
            !user && res.status(401).json({message: "Incorrect Mobile Number"});

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
            decryptedPassword !== req.body.password && res.status(401).json({message: "Password is Incorrect"});

            const {password, ...rest} = user._doc;
            
            const accessToken = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN)

            res.json({...rest, accessToken});
        } catch (error) {
            console.log(error);
        }
    })

    module.exports = router;