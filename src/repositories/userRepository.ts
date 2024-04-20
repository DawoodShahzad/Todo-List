import User from '../models/User';

const userRepository = {
  async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }
};

export default userRepository;
