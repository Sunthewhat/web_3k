import { Router } from 'express';
import athleteRegisterController from '../controller/athleteRegister.controller';

const athleteRegister = Router();

athleteRegister.get(
	'/getSport/:AID',
	athleteRegisterController.getAthleteSport
);
athleteRegister.get('/getMatch', athleteRegisterController.getMatch);
athleteRegister.get('/regis/:mID/:aID', athleteRegisterController.athRegis);
athleteRegister.get('/checkin', athleteRegisterController.getLogs);
athleteRegister.get('/athname/:aid', athleteRegisterController.getAthleteName);
athleteRegister.get(
	'/getlogsbyaid/:aid',
	athleteRegisterController.getLogsByAid
);
athleteRegister.get('/staffName/:sid', athleteRegisterController.getStaffName);
athleteRegister.get(
	'/regisstaff/:sid',
	athleteRegisterController.registerStaff
);

export default athleteRegister;
