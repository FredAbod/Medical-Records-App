import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionName: { type: String },
    // prescriptionDosage: { type: String },
    // startDate: { type: Date },
    // endDate: { type: Date },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
