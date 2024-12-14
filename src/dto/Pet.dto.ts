import { PetEntity } from '../entities/pet.entity';

export default class PetDTO {
	static getPetInputFrom = (pet: PetEntity): PetEntity => {
		return {
			name: pet.name || '',
			specie: pet.specie || '',
			image: pet.image || '',
			birthDate: pet.birthDate || '01/01/2000',
			adopted: pet.adopted || false,
			owner: pet.owner || undefined,
		};
	};
}