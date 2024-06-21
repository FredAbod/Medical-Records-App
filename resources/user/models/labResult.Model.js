import mongoose from 'mongoose';

const labResultSchema = new mongoose.Schema({
    Result: { type: String },
    dateReleased: { type: Date },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    labTechId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTech' }
},
{
  timestamps: true,
  versionKey: false,
});

const labResult  = mongoose.model('labResult ', labResultSchema);

export default labResult;
