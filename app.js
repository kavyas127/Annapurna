const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
require('dotenv').config();
const { connectDB, Donors ,Receivers} = require('./server/models/db');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/donate", function (req, res) {
    res.render("donor");
});

app.post("/donate", async function (req, res) {
    const { hotel_name, hotel_address, hotel_number, hotel_des, hotel_quantity, hotel_time, hotel_site } = req.body;

    if (!hotel_name || !hotel_address || !hotel_number || !hotel_des || !hotel_quantity || !hotel_time || !hotel_site) {
        return res.status(400).send("All fields are required.");

    }
    const newDonation = new Donors({
        Name: hotel_name,
        address: hotel_address,
        phone_number: hotel_number,
        description_food: hotel_des,
        serving_quantity: hotel_quantity,
        closing_time: hotel_time,
        rest_site: hotel_site
    });
    try {
        await newDonation.save();
        console.log("success")
        res.render("thankyou-donor");
    } catch (error) {
        console.error("Failed to add donation:", error);
        res.status(500).send("Failed to add donation: " + error.message);
    }
});

app.get('/submit',(req,res)=>{
res.render('receiver');
})
//

app.post('/submit', async (req, res) => {
    const { ngoName, ngoAddress, ngoPhoneNumber, pickupTime, distributionArea, aadharCard } = req.body;

    if (!ngoName || !ngoAddress || !ngoPhoneNumber || !pickupTime || !distributionArea || !aadharCard) {
        return res.status(400).send("All fields are required.");
    }
    const newReceiver = new Receivers({
      NGO_Name: req.body.ngoName,
      NGO_address:req.body.ngoAddress,
      NGO_phone_number:req.body.ngoPhoneNumber,
      pickup_time:req.body.pickupTime,
      Distribution_area:req.body.distributionArea,
      aadhar_card:req.body.aadharCard,
    });
  
    try {
        await newReceiver.save();
        console.log("success")
        res.render("thankyou-ngo");
    } catch (err) {
        res.status(500).send('Error saving to database: ' + err.message);
    }
  });
  
//


app.get("/receive", async function (req, res) {
    try {
        const donors = await Donors.find();
        console.log(donors); // Log the fetched data
        res.render("hotels-page", { donors });
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/donate", function (req, res) {
    res.render("donor");
});

app.get("/receiver-info", function (req, res) {
    res.render("receiver");
});

app.get("/home", function (req, res) {
    res.render("home");
});

// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(3000, function () {
        console.log("Server is running on port 3000");
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});
