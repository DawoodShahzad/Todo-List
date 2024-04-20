// userSeeder.ts

import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config()

const mongoUri = process.env.MONGO_URI as string

// Dummy user data
const dummyUsers = [
  { username: 'user1', email: 'user1@example.com', password: 'password1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2' },
  // Add more dummy user data as needed
];

async function seedUsers() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(mongoUri);

    // Insert dummy users into the database
    await User.insertMany(dummyUsers);

    console.log('Dummy users inserted successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    // Disconnect from the database after seeding
    await mongoose.disconnect();
  }
}

// Execute the seeder function
seedUsers();