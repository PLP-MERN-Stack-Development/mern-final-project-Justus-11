import express from "express";
import { doctorList, getDoctorById, changeAvailability } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);        // Get all doctors
doctorRouter.get("/:id", getDoctorById);     // Get single doctor by ID
doctorRouter.post("/availability", changeAvailability); // Toggle availability

export default doctorRouter;
