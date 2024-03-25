import { Router } from 'express';
import authController from '../controller/auth.controller';

const auth = Router();

auth.post('/createAdmin', authController.createAdmin);
auth.post('/createModerator', authController.createModerator);
auth.post('/login', authController.login);
auth.get('/logout', authController.logout);
auth.get('/verify', authController.verify);

export default auth;
