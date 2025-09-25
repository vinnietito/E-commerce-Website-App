import userModel from "../models/userModel.js";
import { isValidElement } from "react";

// Route for user login
const loginUser = async (req,res) => {



}

// Route for user Registration
const registerUser = async (req,res) => {

    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({success: false, message: "User already exists!"});
        }

        // Validating email format and strong password
        if


    } catch (error) {
        
    }

}

// Route for admin login
const adminLogin = async (req,res) => {

}

export { loginUser, registerUser, adminLogin };