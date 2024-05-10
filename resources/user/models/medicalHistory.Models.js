import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    diagnosis: { type: String },
    medicationName: { type: String },
    medicationDosage: { type: String },
    medicationDuration: { type: String },
    labResult: { type: String },
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    referringDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

export default MedicalHistory;
