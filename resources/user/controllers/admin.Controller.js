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