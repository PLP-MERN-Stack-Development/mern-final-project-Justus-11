import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());

// =================== CORS ===================
const allowedOrigins = [
  "http://localhost:5173", // local frontend dev
  "https://final-project-hospital-booking-mana-omega.vercel.app", // deployed frontend
  "https://admin-docease.onrender.com" // admin panel if deployed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// =================== ROUTES ===================
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => res.send("API WORKING"));

// =================== START SERVER ===================
app.listen(port, () => console.log("Server running on port", port));
