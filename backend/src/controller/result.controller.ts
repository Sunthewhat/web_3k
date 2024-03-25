import { Request, Response } from 'express';
import resultService from '../services/result.service';
import { medal } from '@prisma/client';

class ResultController {
	async getResultList(req: Request, res: Response) {
		const { date, institute, sport } = req.params;

		try {
			const data = await resultService.getMatchFiltered(date);
			const filtered = data.filter((match) => {
				const isInstituteMatch =
					match.Team_Match_TID1ToTeam.Institute === institute ||
					match.Team_Match_TID2ToTeam.Institute === institute ||
					institute === 'all';
				const isSportMatch =
					match.Team_Match_TID1ToTeam.Sport?.name === sport ||
					match.Team_Match_TID2ToTeam.Sport?.name === sport ||
					sport === 'all';
				return isInstituteMatch && isSportMatch;
			});
			return res.status(200).json(filtered);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async getRoundByMatchId(req: Request, res: Response) {
		const { matchId } = req.params;
		try {
			const data = await resultService.getRoundByMatchId(Number(matchId));
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async addNewRound(req: Request, res: Response) {
		const { matchId } = req.body;
		try {
			const data = await resultService.addNewRound(Number(matchId));
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async updateScore(req: Request, res: Response) {
		const { id, t1Score, t2Score } = req.body;
		try {
			const data = await resultService.updateScore(
				Number(id),
				Number(t1Score),
				Number(t2Score)
			);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async deleteRound(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await resultService.deleteRound(Number(id));
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async approveVerify(req: Request, res: Response) {
		const {
			id,
			sport,
			winner,
			isHaveMedal,
			team1,
			team1Medal,
			team2,
			team2Medal,
		} = req.params;
		try {
			const data = await resultService.setVerify(Number(id), winner);
			let response: medal[] = [];
			if (isHaveMedal === 'true') {
				response = await resultService.setMedal(
					Number(id),
					sport,
					team1,
					team1Medal,
					team2,
					team2Medal
				);
			}
			return res.status(200).json({
				match: data,
				medal: response,
			});
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async getSpecificMatch(req: Request, res: Response) {
		const { sport, gender, type, Agroup, Bgroup } = req.params;
		try {
			const dataA = resultService.getSpecificTeam(
				sport,
				gender,
				type,
				Agroup
			);
			const dataB = resultService.getSpecificTeam(
				sport,
				gender,
				type,
				Bgroup
			);

			return res.status(200).json({
				A: await dataA,
				B: await dataB,
			});
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async createNewMatch(req: Request, res: Response) {
		const {
			TID1,
			TID2,
			startTime,
			CompetitionRoom,
			CompetitionInstitute,
			Description,
		} = req.params;
		try {
			const data = await resultService.addMatch(
				Number(TID1),
				Number(TID2),
				new Date(startTime),
				CompetitionRoom,
				CompetitionInstitute,
				Description
			);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}

export default new ResultController();
