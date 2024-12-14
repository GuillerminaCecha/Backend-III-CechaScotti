import express from 'express';
import { loadEnvFile } from 'process';
import { connectMongoDB } from './config/mongo.config';
import { logger } from './config/logger.config';
import { router as petRouter } from './routes/pets.router';
import { router as userRouter } from './routes/users.router';
import { router as adoptionRouter } from './routes/adoption.router';
import { router as mockRouter } from './routes/mock.router';
import { errorHandle } from './errors/errHandle';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from './config/swagger.config';

const app = express();
loadEnvFile();
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/pets', petRouter);
app.use('/api/users', userRouter);
app.use('/api/adoptions', adoptionRouter);
app.use('/api/mocks', mockRouter);

app.use(errorHandle);

app.listen(process.env.PORT, () => {
	logger.info(`Listening on ${process.env.PORT}`);
});