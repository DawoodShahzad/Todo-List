// userSeeder.ts

import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config()

const mongoUri = process.env.MONGO_URI as string

// Dummy user data
const dummyUsers = [
  { first_name: 'user1', email: 'user1@example.com', age: '20', profile_photo: 'https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg', password: '$2a$10$cNphVcYXXuU1d/sHOpt1jOTmZsq.Z43m5qoWZSKgc.rSKQTd3VtXu', contact_info: { phone_number: '+1234567890', city: 'City1' }},
  { first_name: 'user2', email: 'user2@example.com', age: '21', profile_photo: 'https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg', password: '$2a$10$cNphVcYXXuU1d/sHOpt1jOTmZsq.Z43m5qoWZSKgc.rSKQTd3VtXu', contact_info: { phone_number: '+1234567891', city: 'City 2' }},
  { first_name: 'user3', email: 'user3@example.com', age: '22', profile_photo: 'https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg', password: '$2a$10$cNphVcYXXuU1d/sHOpt1jOTmZsq.Z43m5qoWZSKgc.rSKQTd3VtXu', contact_info: { phone_number: '+1234567892', city: 'City 3' }},
  { first_name: 'user4', email: 'user4@example.com', age: '23', profile_photo: 'https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg', password: '$2a$10$cNphVcYXXuU1d/sHOpt1jOTmZsq.Z43m5qoWZSKgc.rSKQTd3VtXu', contact_info: { phone_number: '+1234567893', city: 'City 4' }},
  { first_name: 'user5', email: 'user5@example.com', age: '24', profile_photo: 'https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg', password: '$2a$10$cNphVcYXXuU1d/sHOpt1jOTmZsq.Z43m5qoWZSKgc.rSKQTd3VtXu', contact_info: { phone_number: '+1234567894', city: 'City 5' }},
];

async function seedUsers() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(mongoUri);

    // Insert dummy users into the database
    await User.insertMany(dummyUsers);

    console.log('Dummy users inserted successfully.');
  } catch (error: any) {
    console.error('Error seeding users:', error.message);
  } finally {
    // Disconnect from the database after seeding
    await mongoose.disconnect();
  }
}

// Execute the seeder function
seedUsers();