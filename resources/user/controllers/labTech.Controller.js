import { passwordHash } from "../../../utils/lib/bcrypt";
import { errorResMsg } from "../../../utils/lib/response";
import Admin from "../models/admin.Models";
import LabTech from "../models/labTech.Models";



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