const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
require('dotenv').config();
const { connectDB, Donors, Receivers } = require('./server/models/db');

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

app.get("/guidelines", function (req, res) {
    res.render("guidelines");
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
        console.log("success");
        res.render("thankyou-donor");
    } catch (error) {
        console.error("Failed to add donation:", error);
        res.status(500).send("Failed to add donation: " + error.message);
    }
});

app.get("/receiver-info/:id", function (req, res) {
    const donorId = req.params.id;
    res.render("receiver", { donorId: donorId });
});


app.post('/submit/:id', async (req, res) => {
    const donorId = req.params.id;
    const { ngoName, ngoAddress, ngoPhoneNumber, pickupTime, distributionArea, aadharCard } = req.body;

    if (!ngoName || !ngoAddress || !ngoPhoneNumber || !pickupTime || !distributionArea || !aadharCard) {
        return res.status(400).send("All fields are required.");
    }

    const newReceiver = new Receivers({
        NGO_Name: ngoName,
        NGO_address: ngoAddress,
        NGO_phone_number: ngoPhoneNumber,
        pickup_time: pickupTime,
        Distribution_area: distributionArea,
        aadhar_card: aadharCard
    });

    try {
        const savedReceiver = await newReceiver.save();
        await Donors.findByIdAndUpdate(donorId, { booked: true, receiver: savedReceiver._id });

        res.render('thankyou-ngo');
    } catch (err) {
        res.status(500).send('Error saving to database: ' + err.message);
    }
});

app.get("/receive", async function (req, res) {
    try {
        const donors = await Donors.find().populate('receiver');
        console.log(donors); 
        res.render("hotels-page", { donors });
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(3000, function () {
        console.log("Server is running on port 3000");
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});