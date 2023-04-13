const express = require("express");
const router = express.Router();
const path = require("path");
// ZADANIE 14

router.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/form.html"));
  });
  
  router.post("/result", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send("Użytkownik: " + username + "<br>Hasło: " + password);
  });

// ZADANIE 12
const { USERS } = require("../users");

router.get("", (req, res) => {
  res.json(USERS);
});

router.get("/:id", (req, res) => {
  const found = USERS.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(USERS.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` });
  }
});

// ZADANIE 13

const metoda = require("../middleware/metoda");

router.post("", metoda, (req, res) => {
  const newUser = {
    id: USERS.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "aktywny",
  };
  if (!newUser.name || !newUser.email) {
    return res
      .status(400)
      .json({ msg: "Wprowadź poprawne imię i nazwisko oraz email!" });
  }
  USERS.push(newUser);
  res.json(USERS);
});

router.patch("/:id", metoda, (req, res) => {
  const found = USERS.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    const updUser = req.body;
    USERS.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name;
        user.email = updUser.email ? updUser.email : user.email;
        res.json({ msg: "Dane użytkownika zaktualizowane", user });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` });
  }
});

router.delete("/:id", metoda, (req, res) => {
  const found = USERS.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    USERS.pop(USERS.indexOf(found));
    res.json(USERS);
  } else {
    res.status(400).json({ msg: "User not found" });
  }
});



module.exports = router;
