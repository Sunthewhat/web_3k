import { Router } from 'express';
import resultController from '../controller/result.controller';

const result = Router();

result.get(
	'/matchFiltered/:date/:institute/:sport',
	resultController.getResultList
);
result.get('/round/:matchId', resultController.getRoundByMatchId);
result.post('/round', resultController.addNewRound);
result.put('/round', resultController.updateScore);
result.delete('/round/:id', resultController.deleteRound);
result.post(
	'/verify/:id/:sport/:winner/:isHaveMedal/:team1/:team1Medal/:team2/:team2Medal',
	resultController.approveVerify
);
result.get(
	'/addteam/:sport/:gender/:type/:Agroup/:Bgroup',
	resultController.getSpecificMatch
);
result.post(
	'/newmatch/:TID1/:TID2/:startTime/:CompetitionRoom/:CompetitionInstitute/:Description',
	resultController.createNewMatch
);

export default result;
