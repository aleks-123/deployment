const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/", movieController.renderMoviesView);
router.get("/movies", movieController.renderMoviesView);

module.exports = router;
