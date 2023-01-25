const router = require("express").Router();
let Admin = require("../models/admin.model");

router.route("/").get((req, res) => {
  Admin.find()
    .then((admin) => res.json(admin))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const useremail = req.body.username;
  const password = req.body.password;

  const newAdmin = new Admin({
    useremail,
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

router.route("/login").post((req, res) => {
  Admin.find({ useremail: req.body.username })
    .then((admin) => {
      if (admin.length === 0) {
        res.send({
          status: "error",
          message: "Admin not found",
        });
      } else {
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

router.route("/update/:id").post((req, res) => {
  Admin.findById(req.params.id)
    .then((admin) => {
      admin.useremail = req.body.useremail;
      admin.password = req.body.password;

      admin
        .save()
        .then(() => res.json("Admin updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
