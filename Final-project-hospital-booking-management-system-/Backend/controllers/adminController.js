import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

// =======================
// Add Doctor Controller
// =======================
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, customSpeciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: "Invalid email" });
    if (!password || password.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const finalSpeciality = speciality === "other" && customSpeciality ? customSpeciality : speciality;

    let parsedAddress = {};
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      parsedAddress = { line1: address, line2: "" };
    }

    if (!imageFile) return res.status(400).json({ success: false, message: "Doctor image not uploaded" });

    const result = await cloudinary.uploader.upload(imageFile.path, { folder: "doctors" });

    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality: finalSpeciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      image: result.secure_url,
    });

    await newDoctor.save();
    res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

// =======================
// Admin Login Controller
// =======================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Super admin login
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email: process.env.ADMIN_EMAIL, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.json({ success: true, token });
    }

    // Check doctor/admin from DB
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) return res.status(404).json({ success: false, message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id, role: "doctor" }, process.env.JWT_SECRET, { expiresIn: "365d" });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

// =======================
// Get All Doctors (Admin)
// =======================
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

export { addDoctor, loginAdmin, getAllDoctors };
