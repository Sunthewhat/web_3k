import { NextFunction, Request, Response } from 'express';
import { Webhook } from 'discord-webhook-node';

const ErrorLogger = (req: Request, res: Response, next: NextFunction) => {
	const webhookURL = process.env.WEBHOOK_URL;
	const hooker = new Webhook(webhookURL as string);
	const isExcludedPath = ['/api/auth/login', '/api/auth/verify'];
	let send = res.send;
	res.send = (c) => {
		console.log(`\tStatus: ${res.statusCode}`);
		if (
			!res.statusCode.toString().startsWith('2') &&
			!isExcludedPath.includes(req.originalUrl)
		) {
			console.log('Body: ', c);
			hooker
				.warning(
					'Oh shit! Someone request make us have to fix fucking unknown Error',
					`From: ${req.originalUrl}`,
					'```\n' + c + '\n```'
				)
				.catch((e) => {
					console.log('Error sending webhook');
					console.log(e);
				});
		}
		res.send = send;
		return res.send(c);
	};
	next();
};

export default ErrorLogger;
