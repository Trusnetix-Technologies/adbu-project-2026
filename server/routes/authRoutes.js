const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { authenticate, generateToken } = require("../middleware/requireLogin");

module.exports = (app) => {
  // Register user
  app.post("/api/v1/auth/register", async (req, res) => {
    const { name, profilePhoto, email, password } = req.body;
    console.log("======== REGISTER USER ========", req.body);

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        profilePhoto,
        email,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          profilePhoto: user.profilePhoto,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Login user
  app.post("/api/v1/auth/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("======== LOGIN USER ========", email);

    try {
      const user = await User.findOne({ email });

      // Check user and password match
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user._id,
          name: user.name,
          profilePhoto: user.profilePhoto,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Get current user
  app.get("/api/v1/auth/me", authenticate, async (req, res) => {
    res.json(req.user);
  });
};
