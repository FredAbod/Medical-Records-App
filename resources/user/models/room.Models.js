import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    dateAssigned: { type: Date },
    patientId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    nurseId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' },
    doctorId: {   type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
},
{
  timestamps: true,
  versionKey: false,
});

const Room = mongoose.model('Room', roomSchema);

export default Room;