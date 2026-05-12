const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const authenticate = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "testsecret123",
      );

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log("ERROR: ", error);
      res.status(401).json({ message: "Not authorized, token failed!" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token!" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "testsecret123", {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN || "7d",
  });
};

module.exports = {
  generateToken,
  authenticate,
};
