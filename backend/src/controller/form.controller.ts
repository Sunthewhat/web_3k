import formService from '../services/form.service';
import type { IFormData, regisTracking } from '../model/formdata';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class FormController {
	async getAvailableSports(req: Request, res: Response): Promise<any> {
		try {
			const institute = req.params.institute;
			const sport = req.params.sport;
			const data = await formService.getDataByInstituteAndSport(
				institute,
				sport
			);
			const noDupedData = data.reduce((uniqueMap, currentEntry) => {
				const key = `${currentEntry.sex}-${currentEntry.type}`;

				if (!uniqueMap.has(key)) {
					uniqueMap.set(key, currentEntry);
				} else {
					const existingEntry = uniqueMap.get(key);

					if (
						existingEntry &&
						existingEntry.status === true &&
						currentEntry.status === false
					) {
						uniqueMap.set(key, currentEntry);
					}
				}
				return uniqueMap;
			}, new Map<string, (typeof data)[number]>());

			const result = Array.from(noDupedData.values());
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async getStatus(req: Request, res: Response) {
		try {
			const institute = req.params.institute;
			const result = await formService.getStatus(institute);
			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	sendTestForm(req: Request, res: Response) {
		try {
			const mockData: IFormData = {
				university: 'University of Test',
				sport: 'basketball',
				sportType: 'male',
				team: 'solo',
				role: 'Test Role',
				number: 'Test Number',
				prefix: 'Test Prefix',
				name: 'Test Name',
				shirt: 'Test Shirt',
				pants: 'Test Pants',
				phone: 'Test Phone',
				studentId: 'Test Student ID',
				allergies: 'Test Allergies',
				email: 'Test Email',
			};
			formService.sendForm(mockData, 'Test Email');
			return res.status(200).json('Form sent!');
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async sendForm(req: Request, res: Response) {
		const data = req.body;
		const prisma = new PrismaClient();
		try {
			let query: regisTracking[];

			query = await prisma.regisTracking.findMany({
				where: {
					sport: data[0].sport,
					institute: data[0].university,
					type: data[0].team,
					sex: data[0].sportType,
					status: false,
				},
			});
			if (query.length === 0) {
				throw 'No more slot';
			}
			const email = data[0].email;
			await Promise.all(
				data.map(async (d: IFormData) => {
					if (d.name === '' || undefined) {
						return;
					}
					await formService.sendForm(d, email);
				})
			);
			await prisma.regisTracking.update({
				where: {
					id: query[0].id,
				},
				data: {
					status: true,
				},
			});
			return res.status(200).json('Form sent!');
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}
}

export default new FormController();
