import { Request, Response } from 'express';

export const errorHandle = (err: any, _req: Request, res: Response) => {
	const status = err.status || 500;
	const message = status === 500 ? 'Internal server error' : err.message;
	res.status(status).json({ status: 'error', error: message });
};