import { passwordHash } from "../../../utils/lib/bcrypt";
import { errorResMsg, successResMsg } from "../../../utils/lib/response";
import Admin from "../models/admin.Models";
import Nurse from "../models/nurses.Models";


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