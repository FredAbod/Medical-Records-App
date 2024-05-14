import { createJwtToken } from "../../../middleware/isAuthenticated.js";
import { passwordCompare, passwordHash } from "../../../utils/lib/bcrypt.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import Admin from "../models/admin.Models.js";
import Doctor from "../models/doctors.Models.js";
import LabTech from "../models/labTech.Models.js";
import Nurse from "../models/nurses.Models.js";
import Patient from "../models/patient.Models.js";
import Pharmacist from "../models/pharmacists.Models.js";
import Registrar from "../models/registrars.Models.js";

export const createAdmin = async (req, res, next) => {
  try {
    const { email, fullName, password } = req.body;

    // Check if email is provided
    if (!email) {
      return errorResMsg(res, 400, "Email is required");
    }

    // Check if the email is already registered
    const checkEmail = await Admin.findOne({ email });
    if (checkEmail) {
      return errorResMsg(res, 400, "Email already registered");
    }
    const pass = await passwordHash(password);

    // Create a new admin instance
    const newAdmin = new Admin({
      email,
      password: pass,
      fullName,
    });

    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();

    // Return success response
    return successResMsg(res, 201, {
      success: true,
      admin: savedAdmin,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const loginAdmin = async (req, res, next) => {
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

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return errorResMsg(res, 406, "Admin does not exist");
    }

    const checkPassword = await passwordCompare(password, admin.password);

    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
      return errorResMsg(res, 406, "invalid credentials");
    }
    const token = createJwtToken({ adminId: admin._id });
    res.cookie("access_token", token);
    // save the token
    admin.token = token;
    await admin.save();
    // Authenticated!
    return successResMsg(res, 200, {
      success: true,
      admin: admin,
      message: "Admin logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};


  export const createPatient = async (req, res, next) => {
    try {
      const {
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        matricNumber,
        faculty,
        department,
        stateOfOrigin,
        country,
        bloodGroup,
        genotype,
        height,
        weight,
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
        !bloodGroup ||
        !genotype ||
        !height ||
        !weight
      ) {
        return errorResMsg(res, 400, "Please provide all required fields");
      }
  
      // Check if the email is already registered
      const checkEmail = await Patient.findOne({ email });
      if (checkEmail) {
        return errorResMsg(res, 400, "Email already registered");
      }
  
      // Create a new patient instance
      const newPatient = new Patient({
        name,
        sex,
        dob,
        address,
        phoneNumber,
        email,
        matricNumber,
        faculty,
        department,
        stateOfOrigin,
        country,
        bloodGroup,
        genotype,
        height,
        weight,
      });
  
      // Save the new patient to the database
      const savedPatient = await newPatient.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        patient: savedPatient,
        message: "Patient created successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const getAllPatient = async (req, res, next) => {
    try {
      const doctors = await Patient.find();
      return successResMsg(res, 200, {
        success: true,
        doctors,
        message: "Patients retrieved successfully",
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
      const patient = await Patient.findById(patientId);
  
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

  export const activatePatientsStatus = async (req, res, next) => {
    try {
      const { patientId } =  req.params;
      // const nurseId = req.user.nurseId;
  
      // // Find the admin by email
      // const nurse = await Nurse.findById({ _id: nurseId });
      // if (!nurse) {
      //   return errorResMsg(res, 406, "Nurse does not exist");
      // }
      // Find the patient by name
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      patient.admitted = "active";
      await patient.save();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        vitals: patient,
        message: "Patient Admitted successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  export const deActivatePatientsStatus = async (req, res, next) => {
    try {
      const { patientId } =  req.params;
      // const nurseId = req.user.nurseId;
  
      // // Find the admin by email
      // const nurse = await Nurse.findById({ _id: nurseId });
      // if (!nurse) {
      //   return errorResMsg(res, 406, "Nurse does not exist");
      // }
      // Find the patient by name
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      patient.admitted = "closed";
      await patient.save();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        vitals: patient,
        message: "Patient Admitted successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };