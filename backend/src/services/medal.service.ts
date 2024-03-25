import { PrismaClient, medal_institute, medal_medal } from "@prisma/client";

class MedalService {
  prisma = new PrismaClient();

  async getMedalByInstitute(institute: medal_institute, type: medal_medal) {
    const response = await this.prisma.medal.aggregate({
      where: {
        institute: institute,
        medal: type,
      },
      _count: true,
    });
    return response;
  }

  async getPointByInstitute(institute: medal_institute) {
    const response = await this.prisma.medal.aggregate({
      where: {
        institute: institute,
      },
      _sum: {
        point: true,
      },
    });
    return response;
  }

  async getScoreInput(){
    const response = await this.prisma.match.aggregate({
      _max: {
        Scoreinput: true,
      },
    });
    const maxScoreInput = response._max.Scoreinput;

    return maxScoreInput;
  }
}
export default new MedalService();
