const router = require("express").Router();
let Users = require("../models/users.model");
let LoginUser = require("../models/loginUser.model");

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

router.route("/login").post((req, res) => {
  Users.find({ useremail: req.body.useremail })
    .then(
      (
        user // user är en array med ett objekt
      ) => {
        if (user.length === 0) {
          res.send({
            status: "error",
            message: "User not found",
          });
        } else {
          if (user[0].password === req.body.password) {
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
      }
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("User and pet deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  Users.findById(req.params.id)
    .then((users) => {
      users.firstname = req.body.firstname;
      users.lastname = req.body.lastname;
      users.useremail = req.body.useremail;
      users.password = req.body.password;
      users.phone = Number(req.body.phone);
      users.address = req.body.address;
      users.city = req.body.city;
      users.zip = Number(req.body.zip);

      users
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
