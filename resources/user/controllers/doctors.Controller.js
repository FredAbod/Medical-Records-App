import { createJwtToken } from "../../../middleware/isAuthenticated.js";
import { passwordCompare, passwordHash } from "../../../utils/lib/bcrypt.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import Admin from "../models/admin.Models.js";
import Diagnosis from "../models/diagnosis.Models.js";
import Doctor from "../models/doctors.Models.js";
import LabOrder from "../models/labOrder.Models.js";
import labResult from "../models/labResult.Model.js";
import LabTech from "../models/labTech.Models.js";
import MedicalHistory from "../models/medicalHistory.Models.js";
import Patient from "../models/patient.Models.js";
import Prescription from "../models/prescription.Models.js";


export const createDoctor = async (req, res, next) => {
    try {
      const {
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        department,
        maritalStatus,
        password,
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
      } = req.body;
      // const adminId = req.user.adminId;
  
      // // Find the admin by email
      // const admin = await Admin.findById({ _id: adminId });
      // if (!admin) {
      //   return errorResMsg(res, 406, "Admin does not exist");
      // }
      // Check if required fields are provided
      if (
        !name ||
        !sex ||
        !dob ||
        !address ||
        !phoneNumber ||
        !department ||
        !maritalStatus ||
        !stateOfOrigin ||
        !country ||
        !nextOfKinName ||
        !password ||
        !nextOfKinPhoneNumber
      ) {
        return errorResMsg(res, 400, "Please provide all required fields");
      }
  
      // Check if the email is already registered
      const checkEmail = await Doctor.findOne({ email });
      if (checkEmail) {
        return errorResMsg(res, 400, "Email already registered");
      }
  
      const pass = await passwordHash(password);
      // Create a new doctor instance
      const newDoctor = new Doctor({
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        department,
        password: pass,
        maritalStatus,
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
      });
  
      // Save the new doctor to the database
      const savedDoctor = await newDoctor.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        doctor: savedDoctor,
        message: "Doctor created successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const deleteDoctor = async (req, res, next) => {
    try {
      const doctorId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the doctor by id
      const doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
      if (!doctor) {
        return errorResMsg(res, 404, "Doctor not found");
      }
  
      // Delete the doctor
    //   await doctor.remove();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        message: "Doctor deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const getAllDoctors = async (req, res, next) => {
    try {
      const doctors = await Doctor.find();
      return successResMsg(res, 200, {
        success: true,
        doctors,
        message: "Doctors retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  
  export const getDoctorById = async (req, res, next) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return errorResMsg(res, 404, "Doctor not found");
      }
      return successResMsg(res, 200, {
        success: true,
        doctor,
        message: "Doctor retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const loginDoctor = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if email is provided
      if (!email) {
        return errorResMsg(res, 400, "Email is required");
      }
  
      // Check if password is provided
      if (!password) {
        return errorResMsg(res, 400, "Password is required");
      }
  
      // Find the doctor by email
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return errorResMsg(res, 406, "Doctor does not exist");
      }
  
      const checkPassword = await passwordCompare(password, doctor.password);
  
      // if user password is not correct throw error ==> invalid credentials
      if (!checkPassword) {
        return errorResMsg(res, 406, "invalid credentials");
      }
      const token = createJwtToken({ doctorId: doctor._id });
      res.cookie("access_token", token);
      // save the token
      doctor.token = token;
      await doctor.save();
      // Authenticated!
      return successResMsg(res, 200, {
        success: true,
        doctor: doctor,
        message: "Doctor logged in successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const addDiagnosis = async (req, res, next) => {
    try {
      const { diagnosis} = req.body;
      const { patientId } = req.params;
      const doctorId = req.user.doctorId;
   // Find the admin by email
   const doctor = await Doctor.findById({ _id: doctorId });
   if (!doctor) {
     return errorResMsg(res, 406, "Doctor does not exist");
   }
      // Find the patient by name
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // Create a new diagnosis
      const newDiagnosis = new Diagnosis({
        diagnosis,
        patientId: patient._id,
        doctorId: doctorId,
      });
  
      // Save the diagnosis
      const savedDiagnosis = await newDiagnosis.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        diagnosis: savedDiagnosis,
        message: "Diagnosis added successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const addLabOrder = async (req, res, next) => {
    try {
      // const { testType, specimen, dateOrdered, patientName, labTechName } = req.body;
      const { testType} = req.body;
      const {patientId} = req.params;
      const doctorId = req.user.doctorId;

         // Find the admin by email
         const doctor = await Doctor.findById({ _id: doctorId });
         if (!doctor) {
           return errorResMsg(res, 406, "Doctor does not exist");
         }
      // Find the patient by name
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // // Find the lab technician by name
      // const labTech = await LabTech.findOne({ name: labTechName });
      // if (!labTech) {
      //   return errorResMsg(res, 404, "Lab Technician not found");
      // }
  
      // Create a new lab order
      const newLabOrder = new LabOrder({
        testType,
        specimen,
        dateOrdered,
        patientId: patient._id,
        doctorId: doctorId,
        // labTechId: labTech._id,
      });
  
      // Save the lab order
      const savedLabOrder = await newLabOrder.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        labOrder: savedLabOrder,
        message: "Lab Order added successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const addPrescription = async (req, res, next) => {
    try {
      const {
        prescriptionName,
        prescriptionDosage,
        startDate,
        endDate,
        patientName,
      } = req.body;
  
      // const {
      //   prescriptionName
      // } = req.body;
      const {patientId} = req.params;

      
      const doctorId = req.user.doctorId;
      // Find the admin by email
      const doctor = await Doctor.findById({ _id: doctorId });
      if (!doctor) {
        return errorResMsg(res, 406, "Doctor does not exist");
      }
  
      // Find the patient by name
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // Create a new prescription
      const newPrescription = new Prescription({
        prescriptionName,
        prescriptionDosage,
        startDate,
        endDate,
        patientName,
        patientId: patient._id,
        doctorId: doctor._id,
      });
  
      // Save the prescription
      const savedPrescription = await newPrescription.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        prescription: savedPrescription,
        message: "Prescription added successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  
export const getAllPatientForDay = async (req, res, next) => {
  try {
      
    const doctorId = req.user.doctorId;
    // Find the admin by email
    const doctor = await Doctor.findById({ _id: doctorId });
    if (!doctor) {
      return errorResMsg(res, 406, "Doctor does not exist");
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of the day

    // Set end of day
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day

    // Find patients created between the start and end of today
    const patients = await Patient.find({
      createdAt: { $gte: today, $lte: endOfDay }
    });

    return successResMsg(res, 200, {
      success: true,
      patients,
      message: "Patients for the day retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};
export const getMedicalHistoryByPatientId = async (req, res, next) => {
  try {
    // Extract patient ID from URL parameters
    const { patientId } = req.params;
    const doctorId = req.user.doctorId;
    // Find the admin by email
    const doctor = await Doctor.findById({ _id: doctorId });
    if (!doctor) {
      return errorResMsg(res, 406, "Doctor does not exist");
    }

    // Find the patient by ID
    const patient = await Patient.findById(patientId).where({ status: "active" });

    if (!patient) {
      return errorResMsg(res, 404, {
        message: "Patient not found",
      });
    }

    // Find medical history for the patient
    const medicalHistory = await MedicalHistory.find({ patientID: patient._id });

    return successResMsg(res, 200, {
      success: true,
      medicalHistory,
      message: "Medical history retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const getLabResultByPatientId = async (req, res, next) => {
  try {
    // Extract patient ID from URL parameters
    const { patientId } = req.params;
    const doctorId = req.user.doctorId;
    // Find the admin by email
    const doctor = await Doctor.findById({ _id: doctorId });
    if (!doctor) {
      return errorResMsg(res, 406, "Doctor does not exist");
    }

    // Find the patient by ID
    const patient = await Patient.findById(patientId).where({ status: "active" });

    if (!patient) {
      return errorResMsg(res, 404, {
        message: "Patient not found",
      });
    }

    // Find lab orders for the patient
    const result = await labResult.find({ patientId: patient._id });

    return successResMsg(res, 200, {
      success: true,
      result,
      message: "Lab Results retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const getPatientById = async (req, res, next) => {
  try {
    // Extract patient ID from URL parameters
    const { patientId } = req.params;
    // Find the patient by ID
    const patient = await Patient.findById(patientId).where({ status: "active" });

    if (!patient) {
      return errorResMsg(res, 404, {
        message: "Patient not found",
      });
    }

    return successResMsg(res, 200, {
      success: true,
      patient,
      message: "Patient retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const getPatientDiagnosis = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const diagnosis = await Diagnosis.findOne({patientId: patientId});
    if (!diagnosis) {
      return errorResMsg(res, 404, "diagnosis not found");
    }
    return successResMsg(res, 200, {
      success: true,
      diagnosis,
      message: "diagnosis retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};