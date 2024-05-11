import { createJwtToken } from "../../../middleware/isAuthenticated";
import { passwordCompare, passwordHash } from "../../../utils/lib/bcrypt";
import { errorResMsg, successResMsg } from "../../../utils/lib/response";
import Admin from "../models/admin.Models";
import Diagnosis from "../models/diagnosis.Models";
import Doctor from "../models/doctors.Models";
import LabTech from "../models/labTech.Models";
import Patient from "../models/patient.Models";


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

export const updateDoctor = async (req, res, next) => {
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
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
      } = req.body;
      const doctorId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the doctor by id
      const doctor = await Doctor.findById({ _id: doctorId });
      if (!doctor) {
        return errorResMsg(res, 404, "Doctor not found");
      }
  
      // Update the doctor's details
      doctor.name = name;
      doctor.sex = sex;
      doctor.dob = dob;
      doctor.address = address;
      doctor.phoneNumber = phoneNumber;
      doctor.email = email;
      doctor.department = department;
      doctor.maritalStatus = maritalStatus;
      doctor.stateOfOrigin = stateOfOrigin;
      doctor.country = country;
      doctor.nextOfKinName = nextOfKinName;
      doctor.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
  
      // Save the updated doctor to the database
      const updatedDoctor = await doctor.save();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        doctor: updatedDoctor,
        message: "Doctor updated successfully",
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
  
  export const getDoctorByName = async (req, res, next) => {
    try {
      const name = req.params.name;
      const doctor = await Doctor.findOne({ name });
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
      const { diagnosis, dateDiagnosized, patientName } = req.body;
      const doctorId = req.user.doctorId;

      // Find the patient by name
      const patient = await Patient.findOne({ name: patientName });
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // Create a new diagnosis
      const newDiagnosis = new Diagnosis({
        diagnosis,
        dateDiagnosized,
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
      const { testType, specimen, dateOrdered, patientName, labTechName } = req.body;
      const doctorId = req.user.doctorId;

         // Find the admin by email
         const doctor = await Doctor.findById({ _id: doctorId });
         if (!doctor) {
           return errorResMsg(res, 406, "Doctor does not exist");
         }
      // Find the patient by name
      const patient = await Patient.findOne({ name: patientName });
      if (!patient) {
        return errorResMsg(res, 404, "Patient not found");
      }
  
      // Find the lab technician by name
      const labTech = await LabTech.findOne({ name: labTechName });
      if (!labTech) {
        return errorResMsg(res, 404, "Lab Technician not found");
      }
  
      // Create a new lab order
      const newLabOrder = new LabOrder({
        testType,
        specimen,
        dateOrdered,
        patientId: patient._id,
        doctorId: doctorId,
        labTechId: labTech._id,
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