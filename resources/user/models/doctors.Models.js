import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  stateOfOrigin: { type: String, required: true },
  country: { type: String, required: true },
  nextOfKinName: { type: String, required: true },
  nextOfKinPhoneNumber: { type: Number, required: true }
},
{
  timestamps: true,
  versionKey: false,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;