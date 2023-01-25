const router = require("express").Router();
let Admin = require("../models/admin.model");

// hämtar alla admin
router.route("/").get((req, res) => {
  Admin.find()
    .then((admin) => res.json(admin))
    .catch((err) => res.status(400).json("Error: " + err));
});

// lägger till admin
router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const adminemail = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({
    firstname,
    lastname,
    adminemail,
    password,
  });

  newAdmin
    .save()
    .then(() => {
      res.send({
        status: "success",
        message: "Admin added",
        id: newAdmin._id,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// loga in som admin
router.route("/login").post((req, res) => {
  Admin.find({ adminemail: req.body.username })
    .then((admin) => {
      if (admin.length === 0) {
        res.send({
          status: "error",
          message: "Admin not found",
        });
      }
      if (admin[0].password === req.body.password) {
        res.send({
          status: "success",
          message: "Admin logged in",
          id: admin[0]._id,
        });
      } else {
        res.send({
          status: "error",
          message: "Wrong password",
        });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Admin.findById(req.params.id)
    .then((admin) => res.json(admin))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
