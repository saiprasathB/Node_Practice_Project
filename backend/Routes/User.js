const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/signup", async (req, res) => {
    console.log(req.body); // Log the incoming request body for debugging
    const { name, email, phone, password, confirmPassword } = req.body;
  
    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    try {
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(200).json({ message: "Email is already registered" });
      }
  
      // Create a new user
      const newUser = new User({ name, email, phone, password, confirmPassword });
  
      // Save the new user to the database
      await newUser.save();
  
      // Respond with a success message
      return res.status(201).json({ message: "User created successfully, awaiting admin approval" });
  
    } catch (err) {
      console.error("Error during signup:", err); // Log the error to the console for debugging
      return res.status(500).json({ message: "Error signing up user", error: err });
    }
  });
  

module.exports = router;
