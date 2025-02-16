import express, { Request, Response, Router } from "express";
import User from "../models/User"; // Ensure correct path to User model
import mongoose from "mongoose";

const router: Router = express.Router(); // ✅ Initialize Express Router

// ✅ Fetch User Profile
router.get("/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId.trim(); // 🔹 Remove spaces & newlines

    console.log("Fetching user with ID:", `"${userId}"`); // Debugging log

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ✅ Update User Profile
router.put("/update/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId.trim();
    const { name, bio, email, age } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bio, email, age },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Ensure the router is correctly exported
export default router;
