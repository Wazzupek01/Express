const express = require("express");
const path = require("path");
const app = express(); //utworzenie obiektu aplikacji express
const routes = require('./api/routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing:
app.get("/", (req, res) => {
  res.send("Prosty serwer oparty na szkielecie programistycznym Express!");
});

app.get("/about", (req, res) => {
  res.send("Autor strony: Jan Kowalski");
});

// ZADANIE 9
app.get("/name/:imie/:imie2", (request, response) => {
  response.status(200);
  response.set("Content-Type", "text/html");
  response.end(
    "<html><body>" +
      "<h1>Cześć " +
      request.params.imie +
      " i " +
      request.params.imie2 +
      "</h1>" +
      "</body></html>"
  );
});

// ZADANIE 10

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/form.html"));
});

// app.post("/result", (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;
//   res.send("Użytkownik: " + username + "<br>Hasło: " + password);
// });

app.post("/result", (req, res) => {
  let name = req.body.name;
  let jezyki = req.body.jezyki;
  response = "Użytkownik: " + name + "<br>Znajomość języków:<ul>";
  if (Array.isArray(jezyki)) {
    jezyki.forEach((el) => {
      response += "<li>" + el + "</li>";
    });
  } else {
    response += "<li>" + jezyki + "</li>";
  }
  response += "</ul>";

  res.send(response);
});

// ZADANIE 11

const { check, validationResult } = require("express-validator");

app.get("/form11", (req, res) => {
  res.sendFile(path.join(__dirname, "./static/form11.html"));
});

const createInitials = (val) => {
  const values = val.split(" ");
  if (values.length == 2) {
    return values[0][0] + values[1][0];
  }
};

app.post(
  "/form",
  [
    check("nazwisko")
      .isLength({ min: 3, max: 25 })
      .isAlpha()
      .withMessage("Złe nazwisko")
      .trim()
      .stripLow()
      .bail(),
    check("email")
      .isEmail()
      .withMessage("To nie email")
      .trim()
      .normalizeEmail()
      .stripLow()
      .bail(),
    check("wiek").isInt({ min: 0, max: 110 }).withMessage("Zły wiek").bail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const nazwisko = req.body.nazwisko;
    const email = req.body.email;
    const wiek = req.body.wiek;
    res.send(
      "Użytkownik: " + nazwisko + "<br>Email: " + email + "<br>Wiek: " + wiek
    );
  }
);

app.use('/api/users', routes);

const isAuthorized = require('./middleware/autoryzacja');

app.use("api/users/result", isAuthorized);

const PORT = 3000; //ustawienie portu
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
