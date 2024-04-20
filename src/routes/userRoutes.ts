import express from 'express';
import userController from '../controllers/userController';

const app = express.Router();

app.post('/login', userController.login);

export default app;
