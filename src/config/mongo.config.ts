import mongoose from 'mongoose';
import { logger } from './logger.config';

export const connectMongoDB = () => {
	try {
		mongoose.connect(process.env.MONGODB_URI as string);
		logger.info('Connected to MongoDB');
	} catch (error: any) {
		logger.error(error.message);
	}
};

export const stringToObjectId = (id: string): mongoose.Types.ObjectId => {
	if (mongoose.Types.ObjectId.isValid(id)) {
		return new mongoose.Types.ObjectId(id);
	} else {
		throw new Error('Invalid ObjectId');
	}
};