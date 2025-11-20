import express from "express";
import { 
  registerPatient, 
  loginPatient,
  getPatientProfile, 
  updateProfile, 
  bookAppointment, 
  listAppointment, 
  cancelAppointment,
  createPaypalOrder,
  capturePaypalOrder
} from '../controllers/UserController.js';

import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post("/register", registerPatient);
userRouter.post("/login", loginPatient);
userRouter.get("/get-profile", authUser, getPatientProfile);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.delete("/appointments/:id", authUser, cancelAppointment);

//  PAYPAL ROUTES 
userRouter.post("/paypal/create-order", authUser, createPaypalOrder);
userRouter.post("/paypal/capture-order", authUser, capturePaypalOrder);

export default userRouter;
