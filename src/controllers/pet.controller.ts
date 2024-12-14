import { Handler } from 'express';
import { PetServices } from '../services/pet.services';
import PetDTO from '../dto/Pet.dto';
import { PetEntity } from '../entities/pet.entity';

export class PetsController {
	private petService: PetServices;
	constructor() {
		this.petService = new PetServices();
	}

	getAllPets: Handler = async (_req, res, next) => {
		try {
			const pets = await this.petService.getAll();
			res.status(200).json({ status: 'success', payload: pets });
		} catch (error) {
			next(error);
		}
	};

	getPetById: Handler = async (req, res, next) => {
		try {
			const { pid } = req.params;
			const pet = await this.petService.getById(pid);
			res.status(200).json({ status: 'success', payload: pet });
		} catch (error) {
			next(error);
		}
	};

	createPet: Handler = async (req, res, next) => {
		try {
			const newPet = req.body as PetEntity;
			if (!newPet)
				throw new Error('Error creating pet, please try again');
			const pet = PetDTO.getPetInputFrom(newPet);
			const petCreated = await this.petService.create(pet);
			res.status(201).json({ status: 'success', payload: petCreated });
		} catch (error) {
			next(error);
		}
	};

	updatePet: Handler = async (req, res, next) => {
		try {
			const petUpdateBody = req.body;
			const { pid } = req.params;
			const petUpdated = await this.petService.update(pid, petUpdateBody);
			res.status(200).json({ status: 'success', payload: petUpdated });
		} catch (error) {
			next(error);
		}
	};

	deletePet: Handler = async (req, res, next) => {
		try {
			const { pid } = req.params;
			const petRemoved = await this.petService.remove(pid);
			res.status(200).json({ status: 'success', payload: petRemoved });
		} catch (error) {
			next(error);
		}
	};

	// createPetWithImage = async (req, res, next) => {
	// 	try {
	// 		const file = req.file;
	// 		const { name, specie, birthDate } = req.body;
	// 		if (!name || !specie || !birthDate)
	// 			return res
	// 				.status(400)
	// 				.send({ status: 'error', error: 'Incomplete values' });
	// 		console.log(file);
	// 		const pet = PetDTO.getPetInputFrom({
	// 			name,
	// 			specie,
	// 			birthDate,
	// 			image: `${__dirname}/../public/img/${file.filename}`,
	// 		});
	// 		console.log(pet);
	// 		const result = await petsService.create(pet);
	// 		res.send({ status: 'success', payload: result });
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// };
}