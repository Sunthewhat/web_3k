import { PrismaClient } from "@prisma/client";

class scheduleService {
    prisma = new PrismaClient();

    async getMatch(){
        const data = await this.prisma.match.findMany({
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
                Score: {
                    select: {
                        T1_Score: true,
                        T2_Score: true,
                    },
                }
            },
        });
        return data;
    }
}
export default new scheduleService();