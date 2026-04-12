const mongoose = require("mongoose");
const Movie = mongoose.model("movies");

// const movies = require("../data/movies");

module.exports = (app) => {
  // Get Movies
  app.get("/api/v1/get/movies", async (req, res) => {
    console.log("Get Movies");

    const response = await Movie.find();

    res.status(200).json({ message: "Movies fetched", response });
    // res.send(movies);
  });

  // Get One Specific Movie
  app.get("/api/v1/get/movie/:id", async (req, res) => {
    console.log("Get One Specific Movie");

    const { id } = req.params;

    const response = await Movie.findById(id);

    res.status(200).json({ message: "Movie fetched", response });
  });

  // Add Movie
  app.post("/api/v1/add/movie", async (req, res) => {
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

  // Update Movie Info
  app.put("/api/v1/update/movie/:id", async (req, res) => {
    console.log("Update Movie");

    const { id } = req.params;

    const { name, img, desc } = req.body;

    const response = await Movie.updateOne({ _id: id }, { name, img, desc });

    res.status(201).json({ message: "Movie updated succesfully.", response });
  });

    // Delete Movie Info
  app.delete("/api/v1/delete/movie/:id", async (req, res) => {
    console.log("Delete Movie");

    const { id } = req.params;

    const response = await Movie.findByIdAndDelete(id);

    res.status(201).json({ message: "Movie deleted succesfully.", response });
  });
};
