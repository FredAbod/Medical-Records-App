import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true},
  sex: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true},
  phoneNumber: { type: String, required: true },
  email: { type: String, unique: true },
  matricNumber: { type: Number},
  faculty: { type: String },
  department: { type: String},
  stateOfOrigin: { type: String },
  country: { type: String},
  bloodGroup: { type: String, required: true},
  genotype: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
},
{
  timestamps: true,
  versionKey: false,
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
