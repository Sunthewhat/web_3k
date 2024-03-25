import { Request, Response } from 'express';
import medalService from '../services/medal.service';

class MedalController {
	async getMedalList(req: Request, res: Response) {
		try {
			const kmuttGold = await medalService.getMedalByInstitute(
				'KMUTT',
				'gold'
			);
			const kmuttSilver = await medalService.getMedalByInstitute(
				'KMUTT',
				'silver'
			);
			const kmuttBronze = await medalService.getMedalByInstitute(
				'KMUTT',
				'bronze'
			);
			const kmitlGold = await medalService.getMedalByInstitute(
				'KMITL',
				'gold'
			);
			const kmitlSilver = await medalService.getMedalByInstitute(
				'KMITL',
				'silver'
			);
			const kmitlBronze = await medalService.getMedalByInstitute(
				'KMITL',
				'bronze'
			);
			const kmutnbGold = await medalService.getMedalByInstitute(
				'KMUTNB',
				'gold'
			);
			const kmutnbSilver = await medalService.getMedalByInstitute(
				'KMUTNB',
				'silver'
			);
			const kmutnbBronze = await medalService.getMedalByInstitute(
				'KMUTNB',
				'bronze'
			);
			const kmuttPoint = await medalService.getPointByInstitute('KMUTT');
			const kmitlPoint = await medalService.getPointByInstitute('KMITL');
			const kmutnbPoint = await medalService.getPointByInstitute(
				'KMUTNB'
			);

			const data = [
				{
					name: 'KMUTT',
					gold: kmuttGold._count,
					silver: kmuttSilver._count,
					bronze: kmuttBronze._count,
					point: kmuttPoint._sum.point,
				},
				{
					name: 'KMITL',
					gold: kmitlGold._count,
					silver: kmitlSilver._count,
					bronze: kmitlBronze._count,
					point: kmitlPoint._sum.point,
				},
				{
					name: 'KMUTNB',
					gold: kmutnbGold._count,
					silver: kmutnbSilver._count,
					bronze: kmutnbBronze._count,
					point: kmutnbPoint._sum.point,
				},
			];
			data.sort((a, b) => b.point! - a.point!);
			return res.status(200).json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}

	async getScoreInput(req: Request, res: Response) {
		try {
			const response = await medalService.getScoreInput();
			return res.status(200).json(response);
		} catch (e) {
			console.log(e);
			return res.status(500).json(e);
		}
	}
}
export default new MedalController();
