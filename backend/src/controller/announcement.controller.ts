import { Request, Response } from 'express';
import announcementService from '../services/announcement.service';
import authService from '../services/auth.service';

class AnnouncementController {
	async getAnnouncementsWithCreator(req: Request, res: Response) {
		try {
			const announcements =
				await announcementService.getAnnouncementsWithCreatorName();
			return res.status(200).json(announcements);
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async setVisibility(req: Request, res: Response) {
		try {
			const { id, value } = req.body;
			await announcementService
				.setVisibility(id, value)
				.then((data) => {
					return res.status(200).json(data);
				})
				.catch((err) => {
					return res.status(400).json(err);
				});
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async setContent(req: Request, res: Response) {
		try {
			const { id, content } = req.body;
			await announcementService
				.setContent(id, content)
				.then((data) => {
					return res.status(200).json(data);
				})
				.catch((err) => {
					return res.status(400).json(err);
				});
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async createAnnouncement(req: Request, res: Response) {
		try {
			const { content, isShowing } = req.body;
			const token = req.cookies.userToken;
			const userId = await authService.getUserIdFromToken(token);

			await announcementService
				.createAnnouncement(content, isShowing, userId)
				.then((data) => {
					return res.status(200).json(data);
				})
				.catch((err) => {
					return res.status(400).json(err);
				});
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async deleteAnnouncement(req: Request, res: Response) {
		try {
			const { id } = req.body;
			await announcementService
				.deleteAnnouncement(id)
				.then((data) => {
					return res.status(200).json(data);
				})
				.catch((err) => {
					return res.status(400).json(err);
				});
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}
}

export default new AnnouncementController();
