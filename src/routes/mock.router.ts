import { Router } from 'express';

import { MockController } from '../controllers/mock.controller';

const mocksController = new MockController();
export const router = Router();

router.get('/mocking-users', mocksController.createUserMocks);
router.get('/mocking-pets', mocksController.createPetMocks);
router.get('/generate-data/:uq/:pq', mocksController.generateData);