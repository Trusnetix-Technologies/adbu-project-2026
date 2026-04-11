const mongoose = require("mongoose");
const Movie = mongoose.model("movies");

// const movies = require("../data/movies");

module.exports = (app) => {
  // Get Movies
  app.get("/get/movies", async (req, res) => {
    console.log("Get Movies");

    const response = await Movie.find();

    res.status(200).json({message: "Movies fetched", response} )
    // res.send(movies);
  });

  // Add Movie
  app.post("/add/movie", async (req, res) => {
    console.log("Add Movie");

    const { name, img, desc } = req.body;

    const movie = await Movie.findOne({ name }); // Check if user already exists
    if (movie) {
      return res.status(400).json({ message: "Movie already exists!" });
    }

    movieFields = { name, desc, img };

    const response = await Movie.create(movieFields);

    res.status(201).json({ message: "Movie added succesfully.", response });
  });
};
