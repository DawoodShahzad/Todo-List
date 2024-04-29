import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define interface for contact info document
interface ContactInfoDocument extends Document {
  phone_number: string;
  city: string;
}

// Define schema for contact info
const ContactInfoSchema = new Schema<ContactInfoDocument>({
  phone_number: { type: String, required: true, unique: true, match: [/^\+(?=\d{7,15}$)\d{7,15}$/, 'Please enter a valid phone number (7-15 digits, starting with +)'] },
  city: { type: String, required: true, minlength: [3, 'City name must be at least 3 characters long'], maxlength: [30, 'City name cannot exceed 30 characters'] },
});

interface UserDocument extends Document {
  first_name: string;
  email: string;
  age: number;
  profile_photo: string;
  contact_info: ContactInfoDocument;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
  first_name: { type: String, minlength: [3, 'First Name must be at least 3 characters long'], maxlength: [20, 'First name cannot exceed 20 characters'], required: true },
  email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'] },
  age: { type: Number, required: true, min: [18, 'Minimum age is 18'], max: [100, 'Maximum age is 100'] },
  profile_photo: { type: String, required: true, match: [/(ftp|http|https):\/\/[^ "]+$/, 'Please enter a valid URL'] },
  password: { type: String, required: true },
  contact_info: { type: ContactInfoSchema },
});

UserSchema.pre<UserDocument>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

UserSchema.methods.comparePassword = async function (this: UserDocument, candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
