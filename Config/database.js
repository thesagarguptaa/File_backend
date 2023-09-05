const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://sg4270173:aZ0NxXMqgUWHLJ96@cluster0.3y2asss.mongodb.net/CloudDataBase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    .then(() => console.log("DB connection is successful"))

    .catch((err) => {
      console.log("Error in Db connection");
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
