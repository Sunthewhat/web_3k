import { Request, Response, NextFunction } from 'express';
function addressTracker(req: Request, res: Response, next: NextFunction) {
	console.log('--------------------');
	console.log(`\tRequest ${req.method} from: ${req.ip}`);
	const date = new Date();
	const dateDis = date.toLocaleString();
	const localeDate = new Date(dateDis);
	// const time = dateDis[1].split('Z')[0];
	console.log(`\tDate: ${localeDate}`);
	// console.log('\tat : ' + time);
	if (req.body && Object.keys(req.body).length != 0) {
		console.log('\tWith body:');
		console.log(req.body);
	} else {
		console.log('\tWithout body');
	}
	console.log(`\tTo: ${req.originalUrl}`);
	next();
}

export default addressTracker;
