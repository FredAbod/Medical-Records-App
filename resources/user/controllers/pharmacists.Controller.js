import { createJwtToken } from "../../../middleware/isAuthenticated.js";
import { passwordCompare, passwordHash } from "../../../utils/lib/bcrypt.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import Admin from "../models/admin.Models.js";
import Diagnosis from "../models/diagnosis.Models.js";
import Doctor from "../models/doctors.Models.js";
import MedicalHistory from "../models/medicalHistory.Models.js";
import Patient from "../models/patient.Models.js";
import Pharmacist from "../models/pharmacists.Models.js";


export const createPharmacist = async (req, res, next) => {
    try {
      const {
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        maritalStatus,
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
        password,
        licenseNumber,
      } = req.body;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Check if required fields are provided
      if (
        !name ||
        !sex ||
        !dob ||
        !address ||
        !phoneNumber ||
        !email ||
        !maritalStatus ||
        !stateOfOrigin ||
        !country ||
        !nextOfKinName ||
        !password ||
        !nextOfKinPhoneNumber ||
        !licenseNumber
      ) {
        return errorResMsg(res, 400, "Please provide all required fields");
      }
  
      // Check if the email is already registered
      const checkEmail = await Pharmacist.findOne({ email });
      if (checkEmail) {
        return errorResMsg(res, 400, "Email already registered");
      }
  
      const pass = await passwordHash(password);
      // Create a new pharmacist instance
      const newPharmacist = new Pharmacist({
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        password: pass,
        maritalStatus,
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
        licenseNumber,
      });
  
      // Save the new pharmacist to the database
      const savedPharmacist = await newPharmacist.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        pharmacist: savedPharmacist,
        message: "Pharmacist created successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };



export const updatePharmacist = async (req, res, next) => {
    try {
      const {
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        maritalStatus,
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
        licenseNumber,
      } = req.body;
      const pharmacistId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the pharmacist by id
      const pharmacist = await Pharmacist.findById({ _id: pharmacistId });
      if (!pharmacist) {
        return errorResMsg(res, 404, "Pharmacist not found");
      }
  
      // Update the pharmacist's details
      pharmacist.name = name;
      pharmacist.sex = sex;
      pharmacist.dob = dob;
      pharmacist.address = address;
      pharmacist.phoneNumber = phoneNumber;
      pharmacist.email = email;
      pharmacist.maritalStatus = maritalStatus;
      pharmacist.stateOfOrigin = stateOfOrigin;
      pharmacist.country = country;
      pharmacist.nextOfKinName = nextOfKinName;
      pharmacist.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
      pharmacist.licenseNumber = licenseNumber;
  
      // Save the updated pharmacist to the database
      const updatedPharmacist = await pharmacist.save();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        pharmacist: updatedPharmacist,
        message: "Pharmacist updated successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const deletePharmacist = async (req, res, next) => {
    try {
      const pharmacistId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the pharmacist by id
      const pharmacist = await Pharmacist.findByIdAndDelete({ _id: pharmacistId });
      if (!pharmacist) {
        return errorResMsg(res, 404, "Pharmacist not found");
      }
  
      // Delete the pharmacist
    //   await pharmacist.remove();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        message: "Pharmacist deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const getAllPharmacists = async (req, res, next) => {
    try {
      const pharmacists = await Pharmacist.find();
      return successResMsg(res, 200, {
        success: true,
        pharmacists,
        message: "Pharmacists retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  
  export const getPharmacistByName = async (req, res, next) => {
    try {
      const name = req.params.name;
      const pharmacist = await Pharmacist.findOne({ name });
      if (!pharmacist) {
        return errorResMsg(res, 404, "Pharmacist not found");
      }
      return successResMsg(res, 200, {
        success: true,
        pharmacist,
        message: "Pharmacist retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const loginPharmacist = async (req, res, next) => {
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
  
      // Find the pharmacist by email
      const pharmacist = await Pharmacist.findOne({ email });
      if (!pharmacist) {
        return errorResMsg(res, 406, "Pharmacist does not exist");
      }
  
      const checkPassword = await passwordCompare(password, pharmacist.password);
  
      // if user password is not correct throw error ==> invalid credentials
      if (!checkPassword) {
        return errorResMsg(res, 406, "invalid credentials");
      }
      const token = createJwtToken({ pharmacistId: pharmacist._id });
      res.cookie("access_token", token);
      // save the token
      pharmacist.token = token;
      await pharmacist.save();
      // Authenticated!
      return successResMsg(res, 200, {
        success: true,
        pharmacist: pharmacist,
        message: "Pharmacist logged in successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const addMedicalHistory = async (req, res, next) => {
    try {
      const {
        medicationName,
        medicationDosage,
        medicationDuration,
        labResult,
        patientName,
        referringDoctorName,
      } = req.body;
      const pharmacistId = req.user.pharmacistId;

    const pharmacist = await Pharmacist.findById({ _id: pharmacistId });
    if (!pharmacist) {
      return errorResMsg(res, 406, "Pharmacist does not exist");
    }
      // Find the patient by name
      const patient = await Patient.findOne({ name: patientName });
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // Find the referring doctor by name
      const referringDoctor = await Doctor.findOne({ name: referringDoctorName });
      if (!referringDoctor) {
        return errorResMsg(res, 404, "Referring Doctor not found");
      }
  
      // Find the diagnosis by name
      const diagnosis = await Diagnosis.findOne({ patientId: patient._id });
      if (!diagnosis) {
        return errorResMsg(res, 404, "Diagnosis not found");
      }
  
      // Create a new medical history
      const newMedicalHistory = new MedicalHistory({
        medicationName,
        medicationDosage,
        medicationDuration,
        labResult,
        patientID: patient._id,
        referringDoctor: referringDoctor._id,
        diagnosis: diagnosis._id,
      });
  
      // Save the medical history
      const savedMedicalHistory = await newMedicalHistory.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        medicalHistory: savedMedicalHistory,
        message: "Medical History added successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const getMedicationHistory = async (req, res, next) => {
    try {
      const patientId = req.params;
      const pharmacistId = req.user.pharmacistId;

    const pharmacist = await Pharmacist.findById({ _id: pharmacistId });
    if (!pharmacist) {
      return errorResMsg(res, 406, "Pharmacist does not exist");
    }
      // Find the patient by name
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // Find the medication history for the patient
      const medicationHistory = await MedicalHistory.find({ patientID: patient._id });
  
      // Return the medication history
      return successResMsg(res, 200, {
        success: true,
        medicationHistory,
        message: "Medication History retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };