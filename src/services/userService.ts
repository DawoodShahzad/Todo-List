import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository';
import { v2 as cloudinaryV2 } from 'cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config()

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'profile_photos',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const parser = multer({ storage: storage });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const userService = {

  async login(email: string, password: string, otp: string) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new Error('Invalid password');

    // Check if OTP is verified
    if (!user.otpVerified || user.otp !== otp) {
      throw new Error('OTP not verified');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return { token };
  },

  async signUp(userData: any, profilePicture: Express.Multer.File) {

    try {

      // Check if email already exists
      const existingUser = await userRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Generate OTP
      const otp = generateOTP();

      // Send OTP via email
      await sendOTP(userData.email, otp);

      // Upload profile photo to Cloudinary
      const result = await cloudinaryV2.uploader.upload(profilePicture.path);
      userData.profilePicture = result.secure_url;

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;

      // Save user data and OTP to database
      const newUser = await userRepository.createUser({ ...userData, otp });

      return newUser;
    } catch (error) {
      throw new Error('Error signing up user');
    }
  },

  async updateProfile(userId: string, profileData: any, profilePicture: Express.Multer.File | undefined) {
    try {
      // Upload profile picture to Cloudinary
      let profilePictureUrl = '';
      if (profilePicture) {
        const result = await cloudinaryV2.uploader.upload(profilePicture.path);
        profilePictureUrl = result.secure_url;
      }

      // Merge profile picture URL into profile data
      const updatedProfileData = { ...profileData, profilePicture: profilePictureUrl };

      // Call repository to update user profile
      const updatedUser = await userRepository.updateProfile(userId, updatedProfileData);
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user profile');
    }
  }
};

// Function to generate OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
const sendOTP = async (email: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification OTP',
      text: `Your OTP for account verification is: ${otp}`
    });
  } catch (error) {
    throw new Error('Error sending OTP');
  }
};

export default userService;