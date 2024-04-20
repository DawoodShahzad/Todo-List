import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository';
import dotenv from 'dotenv';

dotenv.config()

//console.log('process.env.JWT_SECRET: ',process.env.JWT_SECRET);


const userService = {
  async login(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return { token };
  }
};

export default userService;
