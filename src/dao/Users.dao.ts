import { UserEntity } from '../entities/users.entity.js';
import userModel from './models/User.js';

export default class Users {
	get = async (): Promise<UserEntity[] | null> => {
		return await userModel.find();
	};

	getBy = async (id: string): Promise<UserEntity | null> => {
		return await userModel.findById(id);
	};

	create = async (data: UserEntity): Promise<UserEntity | null> => {
		return await userModel.create(data);
	};

	createMany = async (data: UserEntity[]): Promise<UserEntity[] | null> => {
		return await userModel.insertMany(data);
	};

	update = async (
		id: string,
		data: UserEntity
	): Promise<UserEntity | null> => {
		return await userModel.findByIdAndUpdate(id, data, { new: true });
	};

	delete = async (id: string): Promise<UserEntity | null> => {
		return await userModel.findByIdAndDelete(id);
	};
}