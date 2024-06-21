// models/medicine.js
import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    unique: true
  },
  availableNumber: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
