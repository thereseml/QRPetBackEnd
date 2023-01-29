const router = require("express").Router();
let Users = require("../models/users.model");
const CryptoJS = require("crypto-js");

// hämtar alla användare
router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// lägger till användare
router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const useremail = req.body.useremail;
  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.KEY_SALT
  ).toString();
  const phone = Number(req.body.phone);
  const address = req.body.address;
  const city = req.body.city;
  const zip = Number(req.body.zip);

  const newUser = new Users({
    firstname,
    lastname,
    useremail,
    password,
    phone,
    address,
    city,
    zip,
  });

  newUser
    .save()
    .then(() => {
      res.send({
        status: "success",
        message: "User added!",
        id: newUser._id,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// logga in som användare
router.route("/login").post((req, res) => {
  Users.find({ useremail: req.body.useremail })
    .then((user) => {
      if (user.length === 0) {
        res.send({
          status: "error",
          message: "User not found",
        });
      } else {
        if (
          CryptoJS.AES.decrypt(user[0].password, process.env.KEY_SALT).toString(
            CryptoJS.enc.Utf8
          ) === req.body.password
        ) {
          res.send({
            status: "success",
            message: "User logged in",
            id: user[0]._id,
          });
        } else {
          res.send({
            status: "error",
            message: "Wrong password",
          });
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
