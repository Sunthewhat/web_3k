import express, { Request, Response } from 'express';
import form from './routers/form.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './routers/auth.routes';
import addressTracker from './middlewares/addressTracker';
import announcement from './routers/announcement.routes';
import result from './routers/result.routes';
import athleteRegister from './routers/athleteRegister.routes';
import medal from './routers/medal.routes';
import schedule from './routers/schedule.routes';
import ErrorLogger from './middlewares/ErrorLogger';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
	cors({
		origin: [
			'https://regis.web3k.staging.sunthewhat.com',
			'https://admin.web3k.staging.sunthewhat.com',
			'https://public.web3k.staging.sunthewhat.com',
		],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(addressTracker);
app.use(ErrorLogger);

app.get('/', (r: Request, e: Response) => {
	return e.status(200).json('Hello World!');
});

app.use('/api/form', form);
app.use('/api/auth', auth);
app.use('/api/announcement', announcement);
app.use('/api/result', result);
app.use('/api/athleteRegister', athleteRegister);
app.use('/api/medal', medal);
app.use('/api/schedule', schedule);

app.listen(port, () => {
	console.log(`AppServer \tis running on port ${port}`);
});

export default app;
