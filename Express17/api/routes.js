const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/1", (req, res) => {
    res.sendFile(path.join(__dirname,"../static/strona1.html"));
});

router.get("/2", (req, res) => {
    res.sendFile(path.join(__dirname,"../static/strona2.html"));
});

router.get("/3", (req, res) => {
    res.sendFile(path.join(__dirname,"../static/strona3.html"));
});

router.get("/4", (req, res) => {
    res.sendFile(path.join(__dirname,"../static/strona4.html"));
});

router.get("/5", (req, res) => {
    res.sendFile(path.join(__dirname,"../static/strona5.html"));
});

module.exports = router;