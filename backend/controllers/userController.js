import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

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
        if (!validator.isEmail(email)) {
            return  res.json({success: false, message: "Please enter a valid Email!"});
        }
        if (password.length < 8) {
            return  res.json({success: false, message: "Please enter a strong password!"});
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
            //cartData: { items: [] }
        })

        const user = await newUser.save();

        console.log("JWT_SECRET from env:", process.env.JWT_SECRET);


        const token = createToken(user._id);

        res.json({success: true, token});


    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }

}

// Route for admin login
const adminLogin = async (req,res) => {

}

export { loginUser, registerUser, adminLogin };