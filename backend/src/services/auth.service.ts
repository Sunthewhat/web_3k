import { PrismaClient, User, User_privilege, User_role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

class AuthService {
	prisma = new PrismaClient();
	hashPassword(password: string): string {
		const salt = Number(process.env.SALT);
		if (!salt) throw new Error('Check your .env file for salt.');
		const hashedPassword = bcrypt.hashSync(password, salt);
		return hashedPassword;
	}

	async isUsernameExist(username: string): Promise<boolean> {
		const user = await this.prisma.user.findMany({
			where: {
				username,
			},
		});
		return user.length > 0;
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await this.prisma.user.findMany({
			where: {
				username,
			},
		});
		return user[0];
	}

	async getUserById(userId: number): Promise<User> {
		const user = await this.prisma.user.findMany({
			where: {
				userId,
			},
		});
		return user[0];
	}

	async createUser(
		name: string,
		username: string,
		password: string,
		privilege: User_privilege,
		role: User_role
	): Promise<User> {
		const hashedPassword = this.hashPassword(password);
		const data = await this.prisma.user.create({
			data: {
				name,
				username,
				password: hashedPassword,
				privilege,
				role,
			},
		});

		return data;
	}

	verifyPassword(password: string, hashedPassword: string): boolean {
		return bcrypt.compareSync(password, hashedPassword);
	}

	generateToken(userId: number): string {
		const secretKey = process.env.JWT_SECRET as string;
		const token = jwt.sign({ userId }, secretKey, {
			expiresIn: '7d',
		});
		return token;
	}

	decodeToken(token: string): JwtPayload {
		const secretKey = process.env.JWT_SECRET as string;
		const decoded = jwt.verify(token, secretKey);
		return decoded as JwtPayload;
	}

	async getUserIdFromToken(token: string): Promise<number> {
		const decoded = this.decodeToken(token);
		const userId = decoded.userId;
		return userId;
	}
}

export default new AuthService();
