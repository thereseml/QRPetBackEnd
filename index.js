const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
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
