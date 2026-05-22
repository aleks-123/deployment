const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./database/db");
const movieRoutes = require("./routes/movieRoutes");
const viewRoutes = require("./routes/viewRoutes");

dotenv.config({ path: `${__dirname}/config.env` });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewRoutes);
app.use("/api/v1/movies", movieRoutes);

app.use((req, res) => {
  res.status(404).json({ status: "fail", message: `Not found: ${req.originalUrl}` });
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  await db.init();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
