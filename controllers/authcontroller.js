/**
 admin regiseter
 admin verify otp
 admin login
 admin logout  
 
 user regisetr 
 user verify email
 user login
 user logout
  
*/

const asyncHandler = require("express-async-handler")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const { checkEmpty } = require("../utils/checkempty")
const Admin = require("../models/Admin")
const sendEmail = require("../utils/email")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.json(400).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({message: "Provide Strong Password"})
    // }
    const isFound = await Admin.findOne({ email })
    if (isFound) {
        return res.status(400).json({ message: "Email Already Exists" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hash })
    res.json({ message: "admin register success" })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.json(401).json({ message: "All Feilds Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(401).json({ message: "Invalid Email" })
    }

    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(401).json({
            message: process.env.NODE_ENV === "devlopment" ?
                "Email Not Found" : "Invalid Credentials"
        })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({
            message: process.env.NODE_ENV === "developement" ?
                "password do Not Found" : "Invalid Credentials"
        })
    }

    const otp = Math.floor(10000 + Math.random() * 900000)

    await Admin.findByIdAndUpdate(result._id, { otp })

    await sendEmail({
        to: email, subject: "Login OTP", message: `
        <h1>Do not Share Your Account OTP</h1>
        <p>your login OTP ${otp}</p>
        `})
    res.json({ message: "Credentials Verify Success. OTP send to your registered email" })
})


