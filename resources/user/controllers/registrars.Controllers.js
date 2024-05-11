import { passwordHash } from "../../../utils/lib/bcrypt";
import { errorResMsg, successResMsg } from "../../../utils/lib/response";
import Admin from "../models/admin.Models";
import Registrar from "../models/registrars.Models";



export const createRegistrar = async (req, res, next) => {
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
      const checkEmail = await Registrar.findOne({ email });
      if (checkEmail) {
        return errorResMsg(res, 400, "Email already registered");
      }
  
      const pass = await passwordHash(password);
      // Create a new registrar instance
      const newRegistrar = new Registrar({
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
      });
  
      // Save the new registrar to the database
      const savedRegistrar = await newRegistrar.save();
  
      // Return success response
      return successResMsg(res, 201, {
        success: true,
        registrar: savedRegistrar,
        message: "Registrar created successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const updateRegistrar = async (req, res, next) => {
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
      const registrarId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the registrar by id
      const registrar = await Registrar.findById({ _id: registrarId });
      if (!registrar) {
        return errorResMsg(res, 404, "Registrar not found");
      }
  
      // Update the registrar's details
      registrar.name = name;
      registrar.sex = sex;
      registrar.dob = dob;
      registrar.address = address;
      registrar.phoneNumber = phoneNumber;
      registrar.email = email;
      registrar.maritalStatus = maritalStatus;
      registrar.stateOfOrigin = stateOfOrigin;
      registrar.country = country;
      registrar.nextOfKinName = nextOfKinName;
      registrar.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
  
      // Save the updated registrar to the database
      const updatedRegistrar = await registrar.save();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        registrar: updatedRegistrar,
        message: "Registrar updated successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };


  export const deleteRegistrar = async (req, res, next) => {
    try {
      const registrarId = req.params.id;
      const adminId = req.user.adminId;
  
      // Find the admin by email
      const admin = await Admin.findById({ _id: adminId });
      if (!admin) {
        return errorResMsg(res, 406, "Admin does not exist");
      }
      // Find the registrar by id
      const registrar = await Registrar.findByIdAndDelete({ _id: registrarId });
      if (!registrar) {
        return errorResMsg(res, 404, "Registrar not found");
      }
  
      // Delete the registrar
    //   await registrar.remove();
  
      // Return success response
      return successResMsg(res, 200, {
        success: true,
        message: "Registrar deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };

  export const getAllRegistrars = async (req, res, next) => {
    try {
      const registrars = await Registrar.find();
      return successResMsg(res, 200, {
        success: true,
        registrars,
        message: "Registrars retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  
  export const getRegistrarByName = async (req, res, next) => {
    try {
      const name = req.params.name;
      const registrar = await Registrar.findOne({ name });
      if (!registrar) {
        return errorResMsg(res, 404, "Registrar not found");
      }
      return successResMsg(res, 200, {
        success: true,
        registrar,
        message: "Registrar retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return errorResMsg(res, 500, {
        error: error.message,
        message: "Internal server error",
      });
    }
  };