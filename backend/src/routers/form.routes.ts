import formController from '../controller/form.controller';
import { Router } from 'express';

const form = Router();

form.get('/test', formController.sendTestForm);

form.post('/send', formController.sendForm);

form.get('/available/:institute', formController.getStatus);

form.get('/sport/:sport/:institute', formController.getAvailableSports);

export default form;
