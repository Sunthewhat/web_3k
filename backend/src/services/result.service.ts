import {
	PrismaClient,
	Sport_gender,
	Sport_type,
	medal,
	medal_institute,
	medal_medal,
} from '@prisma/client';
import { ResultByDateType } from '../model/result';

class ResultService {
	prisma = new PrismaClient();

	async getMatchFiltered(date: string) {
		const data: ResultByDateType[] = await this.prisma.match.findMany({
			select: {
				Id: true,
				startTime: true,
				CompetitionRoom: true,
				CompetitionInstitute: true,
				Description: true,
				Team_Match_TID1ToTeam: {
					select: {
						Institute: true,
						Sport: true,
					},
				},
				Team_Match_TID2ToTeam: {
					select: {
						Institute: true,
						Sport: true,
					},
				},
				Result: true,
				isVerify: true,
			},
		});
		const filtered = data.filter((match) => {
			const matchDate = match.startTime.toISOString().split('T')[0];
			return matchDate === date;
		});
		return filtered;
	}

	async getRoundByMatchId(matchId: number) {
		const data = await this.prisma.score.findMany({
			where: {
				Match_Id: matchId,
			},
		});
		return data;
	}

	async addNewRound(matchId: number) {
		const prevRoundCount = await this.prisma.score.count({
			where: {
				Match_Id: matchId,
			},
		});
		const data = await this.prisma.score.create({
			data: {
				Match_Id: matchId,
				Round: String(prevRoundCount + 1),
				T1_Score: 0,
				T2_Score: 0,
			},
		});
		return data;
	}

	async updateScore(id: number, t1Score: number, t2Score: number) {
		const data = await this.prisma.score.update({
			where: {
				id: id,
			},
			data: {
				T1_Score: t1Score,
				T2_Score: t2Score,
			},
		});
		return data;
	}

	async deleteRound(id: number) {
		const data = await this.prisma.score.delete({
			where: {
				id: id,
			},
		});
		return data;
	}

	async setVerify(id: number, winner: string) {
		const data = await this.prisma.match.update({
			where: {
				Id: id,
			},
			data: {
				Result: winner,
				isVerify: true,
				Scoreinput: new Date(),
			},
		});
		return data;
	}

	async setMedal(
		id: number,
		sport: string,
		team1: string,
		team1Medal: string,
		team2: string,
		team2Medal: string
	) {
		const response: medal[] = [];
		const majorSport = ['Football', 'Futsal', 'Basketball', 'Volleyball'];
		if (team1Medal !== 'none') {
			let point = 0;
			if (majorSport.includes(sport)) {
				if (team1Medal === 'gold') {
					point = 10;
				}
				if (team1Medal === 'silver') {
					point = 7;
				}
				if (team1Medal === 'bronze') {
					point = 4;
				}
			} else {
				if (team1Medal === 'gold') {
					point = 5;
				}
				if (team1Medal === 'silver') {
					point = 3;
				}
				if (team1Medal === 'bronze') {
					point = 1;
				}
			}
			const data = await this.prisma.medal.create({
				data: {
					matchId: id,
					institute: team1 as medal_institute,
					medal: team1Medal as medal_medal,
					point: point,
				},
			});
			response.push(data);
		}
		if (team2Medal !== 'none') {
			let point = 0;
			if (majorSport.includes(sport)) {
				if (team2Medal === 'gold') {
					point = 10;
				}
				if (team2Medal === 'silver') {
					point = 7;
				}
				if (team2Medal === 'bronze') {
					point = 4;
				}
			} else {
				if (team2Medal === 'gold') {
					point = 5;
				}
				if (team2Medal === 'silver') {
					point = 3;
				}
				if (team2Medal === 'bronze') {
					point = 1;
				}
			}
			const data = await this.prisma.medal.create({
				data: {
					matchId: id,
					institute: team2 as medal_institute,
					medal: team2Medal as medal_medal,
					point: point,
				},
			});
			response.push(data);
		}
		return response;
	}

	async getSpecificTeam(
		sport: string,
		gender: string,
		type: string,
		group: string
	) {
		const data = await this.prisma.team.findMany({
			where: {
				Sport: {
					name: sport,
					gender: gender as Sport_gender,
					type: type as Sport_type,
					group: group,
				},
			},
		});
		return data;
	}

	async addMatch(
		TID1: number,
		TID2: number,
		startTime: Date,
		CompetitionRoom: string,
		CompetitionInstitute: string,
		Description: string
	) {
		const data = await this.prisma.match.create({
			data: {
				TID1,
				TID2,
				startTime,
				CompetitionRoom,
				CompetitionInstitute,
				Description,
				isVerify: false,
			},
		});
		return data;
	}
}

export default new ResultService();
