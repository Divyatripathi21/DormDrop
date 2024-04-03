import nodemailer from 'nodemailer';
import OTP from '../models/otp.model.js';
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv';

dotenv.config();
// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
  }
});

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Controller function to send OTP through email
export const sendotp = async (req, res, next) => {
  const { email } = req.body;


  if(!email ||email==='')
  next(errorHandler(606, 'email is required'));
  
  const otp = generateOTP();

  const otpDocument = new OTP({
    email,
    otp,
  });



  // Email message options
  const mailOptions = {
    from:  process.env.EMAIL,
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}`,
  };

  // Send email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);
      res.status(500).send({ success: false, error: 'Failed to send OTP' });
    } else {
      // otpDocument.save();
      console.log('Email sent: ' + info.response);
      res.send({ success: true, otp: otp });
    }
  });
};