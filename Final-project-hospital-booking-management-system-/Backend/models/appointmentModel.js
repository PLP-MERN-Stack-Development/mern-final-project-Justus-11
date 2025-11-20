import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  docId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending Payment", "Booked", "Cancelled"], // ✅ include Pending Payment
    default: "Pending Payment",
  },
  date: { type: Date, default: Date.now },
  paymentInfo: { type: Object },
  docData: { type: Object },
  userData: { type: Object },
});

export default mongoose.model("Appointment", appointmentSchema);
