import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    image: { type: String, default: 'https://placehold.co/150x150/e0e0e0/000000?text=P' },
    dob: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: {
        street: { type: String },
        city: { type: String },
        zip: { type: String },
        country: { type: String }
    },
    role: { type: String, default: 'patient' }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;