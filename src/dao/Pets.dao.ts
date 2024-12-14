import { PetEntity } from '../entities/pet.entity.js';
import petModel from './models/Pet.js';

export default class Pet {
	get = async (): Promise<PetEntity[] | null> => {
		return await petModel.find();
	};

	getBy = async (id: string): Promise<PetEntity | null> => {
		return await petModel.findById(id);
	};

	create = async (data: PetEntity): Promise<PetEntity | null> => {
		return await petModel.create(data);
	};

	createMany = async (data: PetEntity[]): Promise<PetEntity[] | null> => {
		return await petModel.insertMany(data);
	};

	update = async (id: string, data: PetEntity): Promise<PetEntity | null> => {
		return await petModel.findByIdAndUpdate(id, data, { new: true });
	};

	delete = async (id: string): Promise<PetEntity | null> => {
		return await petModel.findByIdAndDelete(id);
	};
}