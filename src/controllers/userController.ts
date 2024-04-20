import { Request, Response } from 'express';
import BaseController from './BaseController';
import userService from '../services/userService';
//import bcrypt from 'bcryptjs';

class UserController extends BaseController {
  protected service = userService;

  constructor() {
    super();
    this.login = this.login.bind(this); // Bind login method to UserController instance
  }

  async login(req: Request, res: Response) {
    try {
        //const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash('password1', salt);
        //console.log('hashedPassword: ',hashedPassword);
        
      //console.log('Request body:', req.body); // Log request body
      const { email, password } = req.body; // Ensure email and password are correctly extracted
      //console.log('Email:', email); // Log extracted email
      //console.log('Password:', password); // Log extracted password
      const token = await this.service.login(email, password); // Call userService.login
      res.json({ token });
    } catch (error: any) {
      //console.error('Login error:', error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();



// import { Request, Response } from 'express';
// import BaseController from './BaseController';
// import userService from '../services/userService';

// class UserController extends BaseController {
//   protected service = userService;

//   constructor() {
//     super();
//     this.login = this.login.bind(this); // Bind login method to UserController instance
//   }

//   async login(req: Request, res: Response) {
//     await this.handleRequest(req, res, 'login');
//   }
// }

// export default new UserController();
