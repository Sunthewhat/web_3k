import { Request, Response } from 'express';
import scheduleService from '../services/schedule.service';

class ScheduleController {
	async getMatch(req: Request, res: Response) {
		try {
			const data = await scheduleService.getMatch();
			res.status(200).json(data);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	}
}
export default new ScheduleController();
