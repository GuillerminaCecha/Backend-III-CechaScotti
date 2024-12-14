import { Handler } from 'express';
import { UserServices } from '../services/user.services';
import { UserEntity } from '../entities/users.entity';
import UserDTO from '../dto/User.dto';
import { NotFoundError } from '../errors/custom.error';

export class UserControllers {
	private userServices: UserServices;
	constructor() {
		this.userServices = new UserServices();
	}

	// createUserMock = async (req, res) => {
	//   const users = await this.userServices.createMocks();

	//   res.status(201).json({ status: "ok", users });
	// };

	getAllUsers: Handler = async (req, res, next) => {
		try {
			const users = await this.userServices.getAll();
			res.status(200).json({ status: 'success', payload: users });
		} catch (error) {
			next(error);
		}
	};

	getUserById: Handler = async (req, res, next) => {
		try {
			const { uid } = req.params;
			const user = await this.userServices.getById(uid);
			res.status(200).json({ status: 'success', payload: user });
		} catch (error) {
			next(error);
		}
	};

	createUser: Handler = async (req, res, next) => {
		try {
			const newUser = req.body as UserEntity;
			if (!newUser)
				throw new Error('Error creating user, please try again');

			const userCreated = await this.userServices.create(newUser);
			res.status(201).json({ status: 'success', payload: userCreated });
		} catch (error) {
			next(error);
		}
	};

	updateUser: Handler = async (req, res, next) => {
		try {
			const updateBody = req.body;
			const { uid } = req.params;
			const user = await this.userServices.getById(uid);
			if (!user) {
				throw new NotFoundError('User not found');
			}
			const userUpdated = await this.userServices.update(uid, updateBody);
			res.status(200).json({ status: 'success', payload: userUpdated });
		} catch (error) {
			next(error);
		}
	};

	deleteUser: Handler = async (req, res, next) => {
		try {
			const { uid } = req.params;
			const user = await this.userServices.getById(uid);
			if (!user) {
				throw new NotFoundError('User not found');
			}
			const userDeleted = await this.userServices.remove(uid);
			res.status(200).json({
				status: 'success',
				payload: userDeleted,
			});
		} catch (error) {
			next(error);
		}
	};

	createUserMock: Handler = async (req, res, next) => {
		try {
			const users = await this.userServices.createMocks();

			res.status(201).json({ status: 'ok', users });
		} catch (error) {
			next(error);
		}
	};
}