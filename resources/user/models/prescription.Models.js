import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    Prescription_name: { type: String },
    Prescription_dosage: { type: String },
    Start_date: { type: Date },
    End_date: { type: Date },
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
