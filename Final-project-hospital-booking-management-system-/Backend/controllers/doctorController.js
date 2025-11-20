import doctorModel from "../models/doctorModel.js";

// Toggle doctor availability
export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId)
      return res.status(400).json({ success: false, message: "Doctor ID is required" });

    const doc = await doctorModel.findById(docId);
    if (!doc) return res.status(404).json({ success: false, message: "Doctor not found" });

    doc.available = !doc.available;
    await doc.save();

    res.json({ success: true, message: "Availability changed", doctor: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Get all doctors
export const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

// Get single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id).select(["-password", "-email"]);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.json({ success: true, doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};
