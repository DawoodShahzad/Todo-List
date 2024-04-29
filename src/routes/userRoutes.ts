import express from 'express';
import multerMiddleware from '../middlewares/multerMiddleware';
import multer from 'multer';
import userController from '../controllers/userController';
import authenticateToken from '../middlewares/authenticateToken';

const app = express.Router();
const upload = multer({ dest: 'uploads/' });

app.post('/login', userController.login);
app.post('/signup', upload.single('profilePicture'), userController.signUpController);
app.put('/profile', multerMiddleware.single('profilePicture'), authenticateToken, userController.updateProfile);

export default app;
