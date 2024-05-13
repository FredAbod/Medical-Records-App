import { createJwtToken } from "../../../middleware/isAuthenticated.js";
import { passwordCompare, passwordHash } from "../../../utils/lib/bcrypt.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import Admin from "../models/admin.Models.js";
import Doctor from "../models/doctors.Models.js";
import MedicalHistory from "../models/medicalHistory.Models.js";
import Nurse from "../models/nurses.Models.js";
import Patient from "../models/patient.Models.js";
import Room from "../models/room.Models.js";
import Vitals from "../models/vitals.Models.js";

export const createNurse = async (req, res, next) => {
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
    const checkEmail = await Nurse.findOne({ email });
    if (checkEmail) {
      return errorResMsg(res, 400, "Email already registered");
    }

    const pass = await passwordHash(password);
    // Create a new nurse instance
    const newNurse = new Nurse({
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

    // Save the new nurse to the database
    const savedNurse = await newNurse.save();

    // Return success response
    return successResMsg(res, 201, {
      success: true,
      nurse: savedNurse,
      message: "Nurse created successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const updateNurse = async (req, res, next) => {
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
    const nurseId = req.params.id;
    const adminId = req.user.adminId;

    // Find the admin by email
    const admin = await Admin.findById({ _id: adminId });
    if (!admin) {
      return errorResMsg(res, 406, "Admin does not exist");
    }
    // Find the nurse by id
    const nurse = await Nurse.findById({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 404, "Nurse not found");
    }

    // Update the nurse's details
    nurse.name = name;
    nurse.sex = sex;
    nurse.dob = dob;
    nurse.address = address;
    nurse.phoneNumber = phoneNumber;
    nurse.email = email;
    nurse.maritalStatus = maritalStatus;
    nurse.stateOfOrigin = stateOfOrigin;
    nurse.country = country;
    nurse.nextOfKinName = nextOfKinName;
    nurse.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
    nurse.licenseNumber = licenseNumber;

    // Save the updated nurse to the database
    const updatedNurse = await nurse.save();

    // Return success response
    return successResMsg(res, 200, {
      success: true,
      nurse: updatedNurse,
      message: "Nurse updated successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const deleteNurse = async (req, res, next) => {
  try {
    const nurseId = req.params.id;
    const adminId = req.user.adminId;

    // Find the admin by email
    const admin = await Admin.findById({ _id: adminId });
    if (!admin) {
      return errorResMsg(res, 406, "Admin does not exist");
    }
    // Find the nurse by id
    const nurse = await Nurse.findByIdAndDelete({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 404, "Nurse not found");
    }

    // Delete the nurse
    //   await nurse.remove();

    // Return success response
    return successResMsg(res, 200, {
      success: true,
      message: "Nurse deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const getAllNurses = async (req, res, next) => {
  try {
    const nurses = await Nurse.find();
    return successResMsg(res, 200, {
      success: true,
      nurses,
      message: "Nurses retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const getNurseByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    const nurse = await Nurse.findOne({ name });
    if (!nurse) {
      return errorResMsg(res, 404, "Nurse not found");
    }
    return successResMsg(res, 200, {
      success: true,
      nurse,
      message: "Nurse retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const loginNurse = async (req, res, next) => {
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

    // Find the nurse by email
    const nurse = await Nurse.findOne({ email });
    if (!nurse) {
      return errorResMsg(res, 406, "Nurse does not exist");
    }

    const checkPassword = await passwordCompare(password, nurse.password);

    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
      return errorResMsg(res, 406, "invalid credentials");
    }
    const token = createJwtToken({ nurseId: nurse._id });
    res.cookie("access_token", token);
    // save the token
    nurse.token = token;
    await nurse.save();
    // Authenticated!
    return successResMsg(res, 200, {
      success: true,
      nurse: nurse,
      message: "Nurse logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};

export const addVitals = async (req, res, next) => {
  try {
    const { bloodPressure, temperature, height, weight, patientName } =
      req.body;
    const nurseId = req.user.nurseId;

    const nurse = await Nurse.findById({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 406, "Nurse does not exist");
    }
    // Find the patient by name
    const patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      return errorResMsg(res, 404, "Patient not found");
    }

    // Create a new vitals
    const newVitals = new Vitals({
      bloodPressure,
      temperature,
      height,
      weight,
      patientId: patient._id,
    });

    // Save the vitals
    const savedVitals = await newVitals.save();

    // Associate the vitals with the patient
    patient.vitals = savedVitals;
    await patient.save();

    // Return success response
    return successResMsg(res, 201, {
      success: true,
      vitals: savedVitals,
      message: "Vitals added successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal server error",
    });
  }
};
export const admitPatient = async (req, res, next) => {
  try {
    const { patientName } =  req.body;
    const nurseId = req.user.nurseId;

    // Find the admin by email
    const nurse = await Nurse.findById({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 406, "Nurse does not exist");
    }
    // Find the patient by name
    const patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      return errorResMsg(res, 404, "Patient not found");
    }

    patient.admitted = true;
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

export const assignRoom = async (req, res, next) => {
  try {
    const { roomNumber, patientName,doctorName } = req.body;
    const nurseId = req.user.nurseId;

    const nurse = await Nurse.findById({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 406, "Nurse does not exist");
    }
    // Find the patient by name
    const patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      return errorResMsg(res, 404, "Patient not found");
    }

    // Find the doctor by name
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return errorResMsg(res, 404, "Doctor not found");
    }

    // Create a new room assignment
    const newRoomAssignment = new Room({
      roomNumber,
      dateAssigned: Date.now(),
      patientId: patient._id,
      nurseId: nurse._id,
      doctorId: doctor._id,
    });

    // Save the room assignment
    const savedRoomAssignment = await newRoomAssignment.save();

    // Return success response
    return successResMsg(res, 201, {
      success: true,
      roomAssignment: savedRoomAssignment,
      message: "Room assigned successfully",
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
      
    const nurseId = req.user.nurseId;

    const nurse = await Nurse.findById({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 406, "Nurse does not exist");
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
export const getMedicalHistoryByPatientName = async (req, res, next) => {
  try {
    // Extract patient name from request body
    const { patientName } = req.body;
    const nurseId = req.user.nurseId;

    const nurse = await Nurse.findById({ _id: nurseId });
    if (!nurse) {
      return errorResMsg(res, 406, "Nurse does not exist");
    }


    // Find the patient by name
    const patient = await Patient.findOne({ name: patientName });

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