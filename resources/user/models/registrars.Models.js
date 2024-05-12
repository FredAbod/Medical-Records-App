import mongoose from 'mongoose';

const registrarSchema = new mongoose.Schema({
    name: { type: String },
    sex: { type: String },
    dob: { type: Date },
    address: { type: String },
    phoneNumber: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
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

const Registrar = mongoose.model('Registrar', registrarSchema);

export default Registrar;