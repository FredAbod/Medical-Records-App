import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema(
  {
    diagnosis: { type: String },
    dateDiagnosized: Date.now(),
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

export default Diagnosis;
