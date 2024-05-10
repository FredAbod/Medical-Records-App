import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema({
    bloodPressure: { type: String },
    temperature: { type: String },
    height: { type: String },
    weight: { type: String }
},
{
  timestamps: true,
  versionKey: false,
});

const Vitals = mongoose.model('Vitals', vitalsSchema);

export default Vitals;