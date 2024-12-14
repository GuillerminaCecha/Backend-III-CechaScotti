import { fakerES_MX as faker } from '@faker-js/faker';
import { PetEntity } from '../entities/pet.entity';

export const generatePetsMock = async (
	amount: number
): Promise<PetEntity[]> => {
	const pets = [];
	for (let i = 0; i < amount; i++) {
		const pet = {
			name: faker.person.firstName(),
			specie: faker.animal.type(),
			birthDate: faker.date.past().toDateString(),
			adopted: false,
			image: faker.image.avatar(),
			owner: undefined,
		};
		pets.push(pet);
	}

	return pets;
};