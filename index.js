const express = require("express");
const path = require("path");
const art_template = require("art-template");
const bodyParser = require("body-parser");
const router = require("./router.js");
const app = express();

app.set('views', path.join(__dirname,"view")); // specify the views directory
app.set('view engine', 'art') // register the template engine
app.engine('art', require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/bookManager",express.static("public"));
app.use(router);

app.listen(3000,()=>{
    console.log("app is running!!");
})//no clone