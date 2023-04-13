const express = require("express");
const path = require("path");
const app = express();
const reactEngine = require("express-react-views");

app.set("view engine", "jsx");
app.engine("jsx", reactEngine.createEngine());
app.get("/about", (req, res) => {
  res.render("about", { nazwisko: "Kowalski" });
});

app.listen(3000, () => console.log("Serwer działa!"));
