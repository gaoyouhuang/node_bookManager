const express = require("express");
const path = require("path");
const art_template = require("art-template");
const bodyParser = require("body-parser");
const router = require("./router.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/restfulbook",express.static("public"));
app.use(router);

app.listen(3000,()=>{
    console.log("app is running!!");
})//no clone 哈哈哈 ok
