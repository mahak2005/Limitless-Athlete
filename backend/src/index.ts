// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db";
// import cors from "cors";
// import helmet from "helmet";
// import authRoutes from "./routes/authRoutes";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(helmet());

// app.use("/api/auth", authRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("API is working!");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes"; // Existing signup/login routes
import userRoutes from "./routes/userRoutes"; // Profile management routes
import profileRoutes from "./routes/profile";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);  // Signup/Login Routes
app.use("/api/user", userRoutes);  // User Profile Routes
app.use("/api/profile", profileRoutes); // Profile Routes


app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/limitless-athletes")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
