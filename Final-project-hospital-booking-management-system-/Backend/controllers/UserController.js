import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";

// === CORRECT PAYPAL IMPORTS ===
import paypalClient, {
  OrdersCreateRequest,
  OrdersCaptureRequest
} from "../config/paypalClient.js";

// ====================================================================================
// AUTHENTICATION AND PROFILE CONTROLLERS
// ====================================================================================

// REGISTER PATIENT
export const registerPatient = async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;

    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    phone = phone?.trim();

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // strong password check
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must include uppercase, lowercase, and numbers",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// LOGIN PATIENT
export const loginPatient = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim();
    password = password?.trim();

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      patient: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET PATIENT PROFILE
export const getPatientProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res.json({
      success: true,
      patient: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields missing: name, phone, dob, gender",
      });
    }

    const updateData = { name, phone, dob, gender };

    if (address) {
      try {
        updateData.address = JSON.parse(address);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid address format",
        });
      }
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "auto",
        folder: "patient_profiles",
      });

      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Profile updated",
      patient: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// ====================================================================================
// APPOINTMENT (BOOK, LIST, CANCEL)
// ====================================================================================

// BOOK APPOINTMENT (status = Pending Payment)
export const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const doc = await doctorModel.findById(docId).select("-password");
    if (!doc)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });

    if (!doc.available)
      return res
        .status(400)
        .json({ success: false, message: "Doctor not available" });

    const userData = await userModel.findById(userId).select("-password");

    const docDataForAppointment = { ...doc.toObject() };
    delete docDataForAppointment.slots_booked;

    const appointment = await appointmentModel.create({
      userId,
      docId,
      userData,
      docData: docDataForAppointment,
      amount: doc.fees,
      slotTime,
      slotDate,
      date: Date.now(),
      status: "Pending Payment",
    });

    res.json({
      success: true,
      message: "Appointment reserved, proceed to payment",
      appointmentId: appointment._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Reservation failed",
      error: error.message,
    });
  }
};

// LIST APPOINTMENTS
export const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 })
      .lean();

    res.json({
      success: true,
      appointments: appointments.map((a) => ({
        ...a,
        docData: a.docData || {},
        status: a.status || "Pending Payment",
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error listing appointments",
      error: error.message,
    });
  }
};

// CANCEL APPOINTMENT
export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointmentId = req.params.id;

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId,
    });

    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    if (appointment.status === "Cancelled")
      return res
        .status(400)
        .json({ success: false, message: "Already cancelled" });

    appointment.status = "Cancelled";
    await appointment.save();

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cancellation error",
      error: error.message,
    });
  }
};

// ====================================================================================
// PAYPAL PAYMENTS
// ====================================================================================

// CREATE PAYPAL ORDER
export const createPaypalOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId)
      return res
        .status(400)
        .json({ success: false, message: "Missing appointmentId" });

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    if (String(appointment.userId) !== String(req.userId))
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized" });

    if (appointment.status !== "Pending Payment")
      return res.status(400).json({
        success: false,
        message: "Appointment not pending payment",
      });

    const amount = Number(appointment.amount).toFixed(2);

    const request = new OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
          custom_id: appointmentId,
        },
      ],
    });

    const order = await paypalClient.execute(request);

    res.json({
      success: true,
      orderID: order.result.id,
    });
  } catch (error) {
    console.error("PayPal order error:", error);
    res.status(500).json({
      success: false,
      message: "PayPal order creation failed",
      error: error.message,
    });
  }
};

// CAPTURE PAYPAL ORDER
export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderID, appointmentId } = req.body;

    if (!orderID || !appointmentId)
      return res.status(400).json({
        success: false,
        message: "Missing orderID or appointmentId",
      });

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    if (String(appointment.userId) !== String(req.userId))
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized" });

    if (appointment.status === "Booked")
      return res.json({
        success: true,
        message: "Payment already processed",
      });

    // Capture
    const request = new OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // atomic slot booking
    await doctorModel.findByIdAndUpdate(appointment.docId, {
      $addToSet: {
        [`slots_booked.${appointment.slotDate}`]: appointment.slotTime,
      },
    });

    // finalize appointment
    appointment.status = "Booked";
    appointment.paymentInfo = {
      provider: "paypal",
      orderID,
      paidAt: new Date(),
      details: capture.result,
    };

    await appointment.save();

    res.json({
      success: true,
      message: "Appointment confirmed",
      capture: capture.result,
    });
  } catch (error) {
    console.error("PayPal capture error:", error);
    res.status(500).json({
      success: false,
      message: "Capture failed",
      error: error.message,
    });
  }
};
