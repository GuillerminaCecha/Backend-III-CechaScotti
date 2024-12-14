import { Router } from 'express';
import { UserControllers } from '../controllers/users.controller';

const usersController = new UserControllers();
export const router = Router();

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
// router.get("/mock", usersController.createUserMock);
router.get('/:uid', usersController.getUserById);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);