import { PrismaClient } from '@prisma/client';

class AthleteRegisterService {
	prisma = new PrismaClient();
	async getAthleteSport(athleteID: string) {
		const data = await this.prisma.match.findMany({
			where: {
				OR: [
					{
						Team_Match_TID1ToTeam: {
							Member: {
								some: {
									AId: athleteID,
								},
							},
						},
					},
					{
						Team_Match_TID2ToTeam: {
							Member: {
								some: {
									AId: athleteID,
								},
							},
						},
					},
				],
			},
			include: {
				Team_Match_TID1ToTeam: {
					select: {
						Sport: true,
					},
				},
			},
		});

		return data;
	}

	async getMatch() {
		const data = await this.prisma.match.findMany({
			include: {
				Team_Match_TID1ToTeam: {
					include: {
						Sport: true,
						Member: {
							include: {
								Athlete: true,
							},
						},
					},
				},
				Team_Match_TID2ToTeam: {
					include: {
						Sport: true,
						Member: {
							include: {
								Athlete: true,
							},
						},
					},
				},
			},
		});

		return data;
	}

	async sendAthlogin(mID: number, aID: string) {
		const athLog = await this.prisma.checkinLogs.create({
			data: {
				MID: mID,
				AID: aID,
				stamp: new Date(),
			},
		});
		return athLog;
	}

	async getCheckinLogs() {
		const response = await this.prisma.checkinLogs.findMany();
		return response;
	}

	async getLogsByAid(aid: string) {
		const response = await this.prisma.checkinLogs.findMany({
			where: {
				AID: aid,
			},
		});
		return response;
	}

	async getAthleteName(aid: string) {
		const response = await this.prisma.athlete.findUnique({
			where: {
				Id: aid,
			},
		});
		return response;
	}

	async getStaffName(sid: string) {
		const response = await this.prisma.staff.findMany({
			where: {
				Id: sid,
			},
		});
		return response[0];
	}

	async regisStaff(sid: string) {
		const previous = await this.prisma.staffCheckinLogs.findMany({
			where: {
				SID: sid,
			},
		});
		const isTodayChecked = previous.filter((dat) => {
			return (
				dat.stamp.getDate() === new Date().getDate() &&
				dat.stamp.getMonth() === new Date().getMonth() &&
				dat.stamp.getFullYear() === new Date().getFullYear()
			);
		});
		if (isTodayChecked.length > 0) {
			return 'วันนี้ลงทะเบียนไปแล้ว';
		} else {
			await this.prisma.staffCheckinLogs.create({
				data: {
					SID: sid,
					stamp: new Date(),
				},
			});
			return 'ลงทะเบียนสำเร็จ';
		}
	}
}

export default new AthleteRegisterService();
