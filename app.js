const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Routes
app.get("/", function(req, res){
    res.render("home");
});

app.get("/donate",function(req,res){
    res.render("donor");
});

app.get("/",function(req,res){
    res.render("home");
});



















app.listen(3000, function(){
    console.log("Server is running on port 3000");
});