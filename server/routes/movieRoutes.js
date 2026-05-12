const mongoose = require("mongoose");
const Movie = mongoose.model("movies");

module.exports = (app) => {
  // Get Movies
  app.get("/api/v1/get/movies", async (req, res) => {
    console.log("======== GET MOVIES ========");

    try {
      // response of movies with latest inserted in top and oldest in bottom
      const response = await Movie.find().sort({ createdAt: -1 });

      res.status(200).json({ message: "Movies fetched", response });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(201).json({ message: "Error: ", error });
    }
  });

  // Get One Specific Movie
  app.get("/api/v1/get/movie/:id", async (req, res) => {
    console.log("======== GET ONE SPECIFIC MOVIE ========");

    const { id } = req.params;
    try {
      const response = await Movie.findById(id);

      res.status(200).json({ message: "Movie fetched", response });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(201).json({ message: "Error: ", error });
    }
  });

  // Add Movie
  app.post("/api/v1/add/movie", async (req, res) => {
    console.log("======== ADD MOVIE ========");

    const { name, img, desc } = req.body;

    try {
      const movie = await Movie.findOne({ name }); // Check if user already exists
      if (movie) {
        return res.status(400).json({ message: "Movie already exists!" });
      }

      const movieFields = { name, desc, img };

      const response = await Movie.create(movieFields);

      res.status(201).json({ message: "Movie added succesfully.", response });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(201).json({ message: "Error: ", error });
    }
  });

  // Update Movie Info
  app.put("/api/v1/update/movie/:id", async (req, res) => {
    console.log("======== UPDATE MOVIE ========");

    const { id } = req.params;

    const { name, img, desc } = req.body;
    try {
      const response = await Movie.updateOne({ _id: id }, { name, img, desc });

      res.status(201).json({ message: "Movie updated succesfully.", response });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(201).json({ message: "Error: ", error });
    }
  });

  // Delete Movie Info
  app.delete("/api/v1/delete/movie/:id", async (req, res) => {
    console.log("======== DELETE MOVIE ========");

    const { id } = req.params;

    try {
      const response = await Movie.findByIdAndDelete(id);

      res.status(201).json({ message: "Movie deleted succesfully.", response });
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(201).json({ message: "Error: ", error });
    }
  });
};
