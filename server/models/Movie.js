const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    name: { type: String },
    img: { type: String },
    desc: { type: String },
  },
  { timestamps: true },
);

mongoose.model("movies", movieSchema);
