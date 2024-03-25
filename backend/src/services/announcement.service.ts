import { PrismaClient } from '@prisma/client';

class AnnouncementService {
	prisma = new PrismaClient();

	async getAnnouncements() {
		const announcements = await this.prisma.announcement.findMany();
		return announcements;
	}

	async getAnnouncementsWithCreatorName() {
		const announcements = await this.prisma.announcement.findMany({
			include: {
				User: {
					select: {
						name: true,
					},
				},
			},
		});
		return announcements;
	}

	async setVisibility(id: number, value: boolean) {
		const announcement = await this.prisma.announcement.update({
			where: {
				announcementId: id,
			},
			data: {
				isShowing: value,
			},
		});
		return announcement;
	}

	async setContent(id: number, content: string) {
		const announcement = await this.prisma.announcement.update({
			where: {
				announcementId: id,
			},
			data: {
				content: content,
			},
		});
		return announcement;
	}

	async createAnnouncement(
		content: string,
		isShowing: boolean,
		userId: number
	) {
		const announcement = await this.prisma.announcement.create({
			data: {
				content,
				createdTime: new Date(),
				isShowing,
				userId,
			},
		});
		const ret = await this.prisma.announcement.findUnique({
			where: {
				announcementId: announcement.announcementId,
			},
			include: {
				User: {
					select: {
						name: true,
					},
				},
			},
		});
		return ret;
	}

	async deleteAnnouncement(id: number) {
		const announcement = await this.prisma.announcement.delete({
			where: {
				announcementId: id,
			},
		});
		return announcement;
	}
}

export default new AnnouncementService();
