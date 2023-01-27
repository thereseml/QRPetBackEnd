const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
}); */

app.use(
  cors({
    origin: [
      "https://qr-pet.vercel.app",
      "https://localhost:3000",
      "https://qr-pet-thereseml.vercel.app",
    ],
  })
);

app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

const UsersRouter = require("./routes/users");
const PetsRouter = require("./routes/pets");
const AdminRouter = require("./routes/admin");
const SecondRouter = require("./routes/secondOwners");

app.use("/users", UsersRouter);
app.use("/pets", PetsRouter);
app.use("/admin", AdminRouter);
app.use("/secondOwner", SecondRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
