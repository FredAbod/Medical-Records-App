import mongoose from 'mongoose';

const labOrderSchema = new mongoose.Schema({
    testType: { type: String },
    specimen: { type: String },
    dateOrdered: { type: Date },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    labTechId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTech' }
},
{
  timestamps: true,
  versionKey: false,
});

const LabOrder = mongoose.model('LabOrder', labOrderSchema);

export default LabOrder;