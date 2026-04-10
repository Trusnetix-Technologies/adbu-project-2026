const movies = require("../data/movies");

module.exports = (app) => {
  app.get("/get/movies", (req, res) => {
    console.log("Get Movies");

    res.send(movies);
})
};
