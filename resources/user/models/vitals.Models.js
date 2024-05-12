import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema({
    bloodPressure: { type: String },
    temperature: { type: String },
    height: { type: String },
    weight: { type: String },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },

},
{
  timestamps: true,
  versionKey: false,
});

const Vitals = mongoose.model('Vitals', vitalsSchema);

export default Vitals;