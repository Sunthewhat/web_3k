import { PrismaClient, User_privilege } from '@prisma/client';
import { Request, Response } from 'express';
import authService from '../services/auth.service';

class AuthController {
	async createAdmin(req: Request, res: Response) {
		const { name, username, password } = req.body;
		await authService
			.isUsernameExist(username)
			.then(async (isExist) => {
				if (isExist) {
					return res.status(400).json('Username already exist.');
				}
				await authService
					.createUser(name, username, password, 'admin', 'Dev')
					.then((data) => {
						return res.status(200).json(data);
					})
					.catch((err) => {
						console.log(err);
						return res.status(400).json(err);
					});
			})
			.catch((err) => {
				console.log(err);
				return res.status(400).json(err);
			});
	}

	async createModerator(req: Request, res: Response) {
		const { name, username, password, role } = req.body;
		await authService
			.isUsernameExist(username)
			.then(async (isExist) => {
				if (isExist) {
					return res.status(400).json('Username already exist.');
				}
				await authService
					.createUser(name, username, password, 'moderator', role)
					.then((data) => {
						return res.status(200).json(data);
					})
					.catch((err) => {
						console.log(err);
						return res.status(400).json(err);
					});
			})
			.catch((err) => {
				console.log(err);
				return res.status(400).json(err);
			});
	}

	async login(req: Request, res: Response) {
		const { username, password } = req.body;
		await authService
			.isUsernameExist(username)
			.then(async (isExist) => {
				if (!isExist) {
					return res.status(400).json('Username does not exist.');
				}
				await authService
					.getUserByUsername(username)
					.then(async (user) => {
						const isPasswordMatch = authService.verifyPassword(
							password,
							user.password
						);
						if (!isPasswordMatch) {
							return res.status(400).json('Password is wrong.');
						}
						const token = authService.generateToken(user.userId);
						const environment = process.env.ENV;
						if (environment === 'dev') {
							res.cookie('userToken', token, {
								httpOnly: true,
								path: '/',
								sameSite: 'lax',
								secure: false,
								maxAge: 3600000,
							});
						} else
							res.cookie('userToken', token, {
								httpOnly: true,
								path: '/',
								sameSite: 'none',
								secure: true,
								maxAge: 3600000,
							});
						return res.status(200).json('Login Success!');
					})
					.catch((err) => {
						console.log(err);
						return res.status(400).json(err);
					});
			})
			.catch((err) => {
				console.log(err);
				return res.status(400).json(err);
			});
	}

	async logout(req: Request, res: Response) {
		try {
			res.clearCookie('userToken');
			return res.status(200).json('Logout Success!');
		} catch (e) {
			console.log(e);
			return res.status(400).json(e);
		}
	}

	async verify(req: Request, res: Response) {
		const token = req.cookies.userToken;
		if (!token) {
			return res.status(400).json({
				status: 'unverified',
				error: 'Token not found',
			});
		}
		try {
			const decoded = authService.decodeToken(token);
			const { userId } = decoded;
			const user = await authService.getUserById(userId);
			return res.status(200).json({
				status: 'verified',
				name: user.name,
				privilege: user.privilege,
			});
		} catch (e) {
			console.log(e);
			return res.status(400).json({
				status: 'unverified',
				error: e,
			});
		}
	}
}

export default new AuthController();
