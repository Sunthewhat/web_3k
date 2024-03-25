import { Request, Response } from 'express';
import athleteRegisterService from '../services/athleteRegister.service';

class AthleteRegisterController {
	async getAthleteSport(req: Request, res: Response) {
		try {
			const AID = req.params.AID;
			const response = await athleteRegisterService.getAthleteSport(AID);

			const filtered = response.filter((d) => {
				const todayDate = new Date().toISOString().slice(0, 10);
				return todayDate == d.startTime.toISOString().slice(0, 10);
			});

			return res.json(filtered);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async getMatch(req: Request, res: Response) {
		try {
			const response = await athleteRegisterService.getMatch();
			return res.json(response);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async athRegis(req: Request, res: Response) {
		const { mID, aID } = req.params;
		try {
			const response = await athleteRegisterService.sendAthlogin(
				Number(mID),
				aID
			);

			return res.status(200).json(response);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async getLogs(req: Request, res: Response) {
		try {
			const response = await athleteRegisterService.getCheckinLogs();
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	}

	async getAthleteName(req: Request, res: Response) {
		const { aid } = req.params;
		try {
			const response = await athleteRegisterService.getAthleteName(aid);
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	}

	async getLogsByAid(req: Request, res: Response) {
		const { aid } = req.params;
		try {
			const response = await athleteRegisterService.getLogsByAid(aid);
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	}

	async getStaffName(req: Request, res: Response) {
		const { sid } = req.params;
		try {
			const response = await athleteRegisterService.getStaffName(sid);
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	}

	async registerStaff(req: Request, res: Response) {
		const { sid } = req.params;
		try {
			const response = await athleteRegisterService.regisStaff(sid);
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	}
}

export default new AthleteRegisterController();
