import { passwordHash } from "../../../utils/lib/bcrypt";
import { errorResMsg, successResMsg } from "../../../utils/lib/response";
import Admin from "../models/admin.Models";
import Pharmacist from "../models/pharmacists.Models";


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