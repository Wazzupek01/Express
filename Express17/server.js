const express = require("express");
const path = require("path");
const app = express();
const routes = require("./api/routes");
const getDate = require("./server-files/getDate");

app.use("/", routes);

app.get("/", (req, res) => {
  if (req.query.toRad == true) {
    const wynik = (+req.query.value * Math.PI) / 180;
    res.send(req.query.value + " stopni to " + wynik);
  } else {
    const wynik = +req.query.value * (180 / Math.PI);
    res.send(req.query.value + " radianów to " + wynik + " stopni");
  }
});

app.get("/color/", (req, res) => {
    res.send(`<html>
      <head>
        <meta charset="utf-8">
        <title>Ustawianie koloru tła</title>
      </head>
      <body style="background-color: ${req.query.bg || 'white'};">
        <h1>Ustawianie koloru tła</h1>
      </body>
    </html>`);
});

const PORT = 3000; //ustawienie portu
app.listen(PORT, () => console.log(`${getDate()} === Serwer działa na porcie ${PORT}`));
