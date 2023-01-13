const router = require("express").Router();
let secondOwner = require("../models/secondOwner.model");

router.route("/").get((req, res) => {
  secondOwner
    .find()
    .then((secondOwner) => res.json(secondOwner))
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
  const ownerId = req.body.ownerId;

  const newSecondOwner = new secondOwner({
    firstname,
    lastname,
    useremail,
    password,
    phone,
    address,
    city,
    zip,
    ownerId,
  });

  newSecondOwner
    .save()
    .then(() => res.json("Second owner added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  secondOwner
    .findById(req.params.id)
    .then((secondOwner) => res.json(secondOwner))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  secondOwner
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Second owner deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  secondOwner
    .findById(req.params.id)
    .then((secondOwner) => {
      secondOwner.firstname = req.body.firstname;
      secondOwner.lastname = req.body.lastname;
      secondOwner.useremail = req.body.useremail;
      secondOwner.password = req.body.password;
      secondOwner.phone = Number(req.body.phone);
      secondOwner.address = req.body.address;
      secondOwner.city = req.body.city;
      secondOwner.zip = Number(req.body.zip);
      secondOwner.ownerId = req.body.ownerId;

      secondOwner
        .save()
        .then(() => res.json("Second owner updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
