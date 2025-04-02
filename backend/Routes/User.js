const express = require("express");
const router = express.Router();
const User = require("../models/User");

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


router.get("/unverified", async (req, res) => {
    try {
        
        const unverifiedUsers = await User.find({ isVerified: false });
        return res.status(200).json(unverifiedUsers);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching unverified users", error: err });
    }
});


router.post("/accept/:id", async (req, res) => {
    try {
        const userId = req.params.id;
       
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isVerified: true },
            { new: true }  
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User verified successfully", user: updatedUser });
    } catch (err) {
        return res.status(500).json({ message: "Error verifying user", error: err });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) { 
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        if (!user.isVerified) {
            return res.status(400).json({ message: "Your account is not verified. Please contact the admin." });
        }

       
        res.status(200).json({ isVerified: user.isVerified });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;