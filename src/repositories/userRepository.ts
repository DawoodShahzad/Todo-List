import User from '../models/User';

const userRepository = {

  async getUserByEmail(email: string) {
    return await User.findOne({ email });
  },

  async createUser(userData: any) {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  },

  async updateProfile(userId: string, profileData: any) {
    try {
      // Find user by ID and update profile data
      const updatedUser = await User.findByIdAndUpdate(userId, profileData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user profile');
    }
  }

};

export default userRepository;
