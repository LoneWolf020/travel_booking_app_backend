const express = require("express");
const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singleHotelRouter = require("./routes/singlehotel.router");
const connectDB = require("./config/dbconfig");
const dotenv = require("dotenv");
const hotelDataAddToDB = require("./routes/data.router");
const categoryAddToDB = require("./routes/categoryimport.router");

dotenv.config();     // either include this in config file or here else URI value will get undefined


const app = express();

connectDB();

app.use(express.json());
const PORT = 3500;

app.get("/", (req, res) => {
    res.send("Hello App");
})

app.use("/api/hotels", hotelRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/hoteldata", hotelDataAddToDB);
app.use("/api/categorydata", categoryAddToDB);
app.use("/api/hotels", singleHotelRouter);   //if ID is given it will come to this router



app.listen(process.env.PORT || PORT, () => {
    console.log("Server is up and running");
})