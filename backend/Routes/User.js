const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup route (existing code)
router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { name, email, phone, password, confirmPassword, isAdmin, isVerified } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "Email is already registered" });
        }

        const newUser = new User({ name, email, phone, password, confirmPassword, isAdmin, isVerified });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully, awaiting admin approval" });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ message: "Error signing up user", error: err });
    }
});

// Route to fetch unverified users
router.get("/unverified-users", async (req, res) => {
    try {
        const unverifiedUsers = await User.find({ isVerified: false });
        return res.status(200).json(unverifiedUsers);
    } catch (err) {
        console.error("Error fetching unverified users:", err);
        return res.status(500).json({ message: "Error fetching unverified users", error: err });
    }
});

// Route to verify a user
router.patch("/verify-user/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isVerified = true;
        await user.save();

        return res.status(200).json({ message: "User verified successfully" });
    } catch (err) {
        console.error("Error verifying user:", err);
        return res.status(500).json({ message: "Error verifying user", error: err });
    }
});

module.exports = router;