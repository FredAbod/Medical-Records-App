import mongoose from 'mongoose';

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: false },
  licenseNumber: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  stateOfOrigin: { type: String, required: true },
  country: { type: String, required: true },
  nextOfKinName: { type: String, required: true },
  token: { type: String },
  nextOfKinPhoneNumber: { type: Number, required: true }
},
{
  timestamps: true,
  versionKey: false,
});

const Nurse = mongoose.model('Nurse', nurseSchema);

export default Nurse;