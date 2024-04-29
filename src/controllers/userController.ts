import { Request, Response } from 'express';
import BaseController from './BaseController';
import userService from '../services/userService';

class UserController extends BaseController {
  protected service = userService;

  constructor() {
    super();
    this.login = this.login.bind(this); // Bind login method to UserController instance
    this.signUpController = this.signUpController.bind(this); // Bind signUpController method
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      res.json({ token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async signUpController(req: Request, res: Response) {
    try {
      // Check if req.file exists before passing it to signUp
      if (req.file) {
        const newUser = await userService.signUp(req.body, req.file);
        res.status(201).json(newUser);
      } else {
        throw new Error('Profile photo is required.');
      }
      const newUser = await userService.signUp(req.body, req.file);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  async updateProfile(req: Request, res: Response) {
    try {
      const updatedUser = await userService.updateProfile(req.user.id, req.body, req.file);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
