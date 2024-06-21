import { createJwtToken } from "../../../middleware/isAuthenticated.js";
import { passwordCompare, passwordHash } from "../../../utils/lib/bcrypt.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import Admin from "../models/admin.Models.js";
import Doctor from "../models/doctors.Models.js";
import LabOrder from "../models/labOrder.Models.js";
import labResult from "../models/labResult.Model.js";
import LabTech from "../models/labTech.Models.js";
import Patient from "../models/patient.Models.js";



export const createLabTech = async (req, res, next) => {
    try {
      const {
        name,
        sex,
        dob,
        address,
        password,
        phoneNumber,
        email,
        maritalStatus,
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
        !password ||
        !phoneNumber ||
        !maritalStatus ||
        !stateOfOrigin ||
        !country ||
        !nextOfKinName ||
        !nextOfKinPhoneNumber
      ) {
        return errorResMsg(res, 400, "Please provide all required fields");
      }
  
      // Check if the email is already registered
      const checkEmail = await LabTech.findOne({ email });
      if (checkEmail) {
        return errorResMsg(res, 400, "Email already registered");
      }
  
      const pass = await passwordHash(password);
      // Create a new lab tech instance
      const newLabTech = new LabTech({
        name,
        sex,
        dob,
        address,
        password: pass,
        phoneNumber,
        email,
        maritalStatus,
        stateOfOrigin,
        country,
        nextOfKinName,
        nextOfKinPhoneNumber,
      });
  
      // Save the new lab tech to the database
      const savedLabTech = await newLabTech.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        labTech: savedLabTech,
        message: "Lab Tech created successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };


  export const updateLabTech = async (req, res, next) => {
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
      } = req.body;
      const labTechId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the lab technician by id
      const labTech = await LabTech.findById({ _id: labTechId });
      if (!labTech) {
        return errorResMsg(res, 404, "Lab Technician not found");
      }
  
      // Update the lab technician's details
      labTech.name = name;
      labTech.sex = sex;
      labTech.dob = dob;
      labTech.address = address;
      labTech.phoneNumber = phoneNumber;
      labTech.email = email;
      labTech.maritalStatus = maritalStatus;
      labTech.stateOfOrigin = stateOfOrigin;
      labTech.country = country;
      labTech.nextOfKinName = nextOfKinName;
      labTech.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
  
      // Save the updated lab technician to the database
      const updatedLabTech = await labTech.save();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        labTech: updatedLabTech,
        message: "Lab Technician updated successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };


  export const deleteLabTech = async (req, res, next) => {
    try {
      const labTechId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the lab technician by id
      const labTech = await LabTech.findByIdAndDelete({ _id: labTechId });
      if (!labTech) {
        return errorResMsg(res, 404, "Lab Technician not found");
      }
  
      // Delete the lab technician
    //   await labTech.remove();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        message: "Lab Technician deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const loginLabTech = async (req, res, next) => {
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
  
      // Find the lab technician by email
      const labTech = await LabTech.findOne({ email });
      if (!labTech) {
        return errorResMsg(res, 406, "Lab Technician does not exist");
      }
  
      const checkPassword = await passwordCompare(password, labTech.password);
  
      // if user password is not correct throw error ==> invalid credentials
      if (!checkPassword) {
        return errorResMsg(res, 406, "invalid credentials");
      }
      const token = createJwtToken({ labTechId: labTech._id });
      res.cookie("access_token", token);
      // save the token
      labTech.token = token;
      await labTech.save();
      // Authenticated!
      return successResMsg(res, 200, {
        success: true,
        labTech: labTech,
        message: "Lab Technician logged in successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const addLabResult = async (req, res, next) => {
    try {
      const { result, dateReleased, patientName, doctorName} = req.body;
      const labTechId = req.user.labTechId;

      // Find the admin by email
      const labTech = await LabTech.findById({ _id: labTechId });
      if (!labTech) {
        return errorResMsg(res, 406, "LabTech does not exist");
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
  
      // Create a new lab result
      const newLabResult = new labResult({
        result,
        dateReleased,
        patientId: patient._id,
        doctorId: doctor._id,
        labTechId: labTech._id,
      });
  
      // Save the lab result
      const savedLabResult = await newLabResult.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        labResult: savedLabResult,
        message: "Lab Result added successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const getLabOrdersByPatientId = async (req, res, next) => {
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
  
      // Find lab orders for the patient
      const labOrders = await LabOrder.find({ patientId: patient._id });
  
      return successResMsg(res, 200, {
        success: true,
        labOrders,
        message: "Lab orders retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  export const getPatientLabOrder = async (req, res, next) => {
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
  
      // Find lab orders for the patient
      const labOrders = await LabOrder.find({ patientId: patient._id });
  
      return successResMsg(res, 200, {
        success: true,
        labOrders,
        message: "Lab orders retrieved successfully",
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
        
      const labTechId = req.user.labTechId;

      // Find the admin by email
      const labTech = await LabTech.findById({ _id: labTechId });
      if (!labTech) {
        return errorResMsg(res, 406, "LabTech does not exist");
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
