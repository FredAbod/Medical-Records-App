import mongoose from 'mongoose';

const pharmacistSchema = new mongoose.Schema({
  name: { type: String },
  sex: { type: String },
  dob: { type: Date },
  address: { type: String },
  password: { type: String },
  phoneNumber: { type: Number },
  licenseNumber: { type: String },
  email: { type: String, required: true },
  maritalStatus: { type: String },
  stateOfOrigin: { type: String },
  country: { type: String },
  token: { type: String },
  nextOfKinName: { type: String },
  nextOfKinPhoneNumber: { type: Number }
},
{
  timestamps: true,
  versionKey: false,
});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

export default Pharmacist;