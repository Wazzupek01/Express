const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/about", (req, res) => {
  res.render("about", { name: "Jan" });
});

app.get("/info/:surname/:email/:age", (req, res) => {
  res.render("info", {
    surname: req.params.surname,
    email: req.params.email,
    age: req.params.age,
  });
});

app.listen(3000, () => console.log("Serwer działa!"));
