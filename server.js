require("dotenv").config();
const express = require("express");
const db = require("./Model");
const cors = require("cors")

const userRoutes = require("./Routes/userRoute");
const organisationRoutes = require("./Routes/organsationRoute");
const getUser = require("./Routes/getUserRoute")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoutes);
app.use("/api", getUser)
app.use("/api/organisations", organisationRoutes);

const port = process.env.PORT;

db.sequelize  
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
