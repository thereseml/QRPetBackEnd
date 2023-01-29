const router = require("express").Router();
let Admin = require("../models/admin.model");
const CryptoJS = require("crypto-js");

// hämtar alla admin
router.route("/").get((req, res) => {
  Admin.find()
    .then((admin) => res.json(admin))
    .catch((err) => res.status(400).json("Error: " + err));
});

// lägger till admin
router.route("/add").post((req, res) => {
  const adminemail = req.body.adminemail;
  const password = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.ADMIN_SALT
  ).toString();

  const newAdmin = new Admin({
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
  Admin.find({ adminemail: req.body.adminemail })
    .then((admin) => {
      if (admin.length === 0) {
        res.send({
          status: "error",
          message: "Admin not found",
        });
      } else {
        if (
          CryptoJS.AES.decrypt(
            admin[0].password,
            process.env.ADMIN_SALT
          ).toString(CryptoJS.enc.Utf8) === req.body.password
        ) {
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

module.exports = router;
