const bcrypt = require("bcrypt");
const User = require("../models/user");
const createToken = require('../utils/createToken')



const signup = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;

    // Hash password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(res,"consnsneneneendjfnfjf");
    const newUser = await User.create({ name, username, password: hashedPassword, email });
    // Create a JWT and send it as a response with user's id inside
    console.log(res,"response here")
    const token = createToken(newUser._id);
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User registered successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000 && error.keyPattern) {
      if(error.keyPattern.username){
        res.status(400).json({ error: "Username is already taken" });
      }else{
        res.status(400).json({ error: "Email is already in use"})
      }
      // Duplicate key error (username is not unique)
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = createToken(user._id);
    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({
        success: true,
        data: user,
        message: "Login successful",
        token: token
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup, login };
