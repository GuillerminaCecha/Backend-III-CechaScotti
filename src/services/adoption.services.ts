import Adoption from '../dao/Adoption.dao';
import { AdoptionEntity } from '../entities/adoption.entity';
import { BadRequestError, NotFoundError } from '../errors/custom.error';

export class AdoptionServices {
	private adoptionDao: Adoption;
	constructor() {
		this.adoptionDao = new Adoption();
	}
	async getAll(): Promise<AdoptionEntity[] | null> {
		const adoptions = await this.adoptionDao.get();
		return adoptions;
	}
	async getById(id: string): Promise<AdoptionEntity | null> {
		const adoption = await this.adoptionDao.getById(id);
		if (!adoption) throw new NotFoundError(`Adoption id ${id} not found`);
		return adoption;
	}

	async create(data: AdoptionEntity): Promise<AdoptionEntity | null> {
		const adoption = await this.adoptionDao.create(data);
		if (!adoption)
			throw new BadRequestError(
				'Error creating adoption, please try again'
			);
		return adoption;
	}

	async update(
		id: string,
		data: AdoptionEntity
	): Promise<AdoptionEntity | null> {
		const adoption = await this.adoptionDao.update(id, data);
		if (!adoption)
			throw new BadRequestError(
				'Error updating adoption, please try again'
			);
		return adoption;
	}

	async remove(id: string): Promise<AdoptionEntity | null> {
		const adoptionDeleted = await this.adoptionDao.delete(id);
		if (!adoptionDeleted)
			throw new BadRequestError(
				`Error deleting adoption, please try again`
			);
		return adoptionDeleted;
	}
}