import { AdoptionEntity } from '../entities/adoption.entity';
import adoptionModel from './models/Adoption';

export default class Adoption {
	get = async (): Promise<AdoptionEntity[] | null> => {
		return await adoptionModel.find();
	};

	getById = async (id: string): Promise<AdoptionEntity | null> => {
		return await adoptionModel.findById(id);
	};

	create = async (data: AdoptionEntity): Promise<AdoptionEntity | null> => {
		return await adoptionModel.create(data);
	};

	update = async (
		id: string,
		data: AdoptionEntity
	): Promise<AdoptionEntity | null> => {
		return await adoptionModel.findByIdAndUpdate(id, data, { new: true });
	};

	delete = async (id: string): Promise<AdoptionEntity | null> => {
		return await adoptionModel.findByIdAndDelete(id);
	};
}