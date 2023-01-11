const router = require("express").Router();
let Users = require("../models/users.model");

router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const useremail = req.body.useremail;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const pets = req.body.pets;

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
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.useremail = req.body.useremail;
      user.password = req.body.password;
      user.phone = req.body.phone;
      user.address = req.body.address;
      user.city = req.body.city;
      user.zip = req.body.zip;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
