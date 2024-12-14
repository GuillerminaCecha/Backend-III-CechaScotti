import { Handler } from 'express';
import { AdoptionServices } from '../services/adoption.services';
import { PetServices } from '../services/pet.services';
import { UserServices } from '../services/user.services';
import { NotFoundError } from '../errors/custom.error';
import { stringToObjectId } from '../config/mongo.config';
import { PetEntity } from '../entities/pet.entity';
import { UserEntity } from '../entities/users.entity';

export class AdoptionController {
	private adoptionService: AdoptionServices;
	private petService: PetServices;
	private userService: UserServices;

	constructor() {
		this.adoptionService = new AdoptionServices();
		this.petService = new PetServices();
		this.userService = new UserServices();
	}

	getAllAdoptions: Handler = async (_req, res, next) => {
		try {
			const adoptions = await this.adoptionService.getAll();
			res.status(200).json({ status: 'success', payload: adoptions });
		} catch (error) {
			next(error);
		}
	};

	getAdoptionById: Handler = async (req, res, next) => {
		try {
			const { aid } = req.params;
			const adoption = await this.adoptionService.getById(aid);
			res.status(200).json({ status: 'success', payload: adoption });
		} catch (error) {
			next(error);
		}
	};

	createAdoption: Handler = async (req, res, next) => {
		try {
			const { uid, pid } = req.params;
			const user = await this.userService.getById(uid);
			const pet = await this.petService.getById(pid);
			if (!user || !pet) throw new NotFoundError('User or pet not found');
			if (pet.adopted) throw new Error('Pet already adopted');
			pet.adopted = true;
			pet.owner = stringToObjectId(uid);
	
			user.pets?.push({ pet: stringToObjectId(pid) });
			await this.userService.update(uid, user);
			await this.petService.update(pid, pet);
			const adoption = await this.adoptionService.create({
				owner: stringToObjectId(uid),
				pet: stringToObjectId(pid),
			});

			res.status(201).json({ status: 'success', payload: adoption });
		} catch (error) {
			next(error);
		}
	};

	deleteAdoption: Handler = async (req, res, next) => {
		try {
			const { aid } = req.params;
			const adoptionRemoved = await this.adoptionService.remove(aid);
			if (!adoptionRemoved) throw new NotFoundError('Adoption not found');
			const user = await this.userService.getById(
				adoptionRemoved?.owner._id.toString()!
			);
			const pet = await this.petService.getById(
				adoptionRemoved?.pet._id.toString()!
			);

			if (!user || !pet) throw new NotFoundError('User or pet not found');

			user!.pets = user!.pets?.filter(
				(item) => item.pet._id?.toString() !== pet._id?.toString()
			);

			await this.userService.update(user?._id?.toString()!, {
				pets: user!.pets,
			} as UserEntity);
			await this.petService.update(pet?._id?.toString()!, {
				adopted: false,
				owner: undefined,
			} as PetEntity);

			res.status(200).json({
				status: 'success',
				payload: adoptionRemoved,
			});
		} catch (error) {
			next(error);
		}
	};

	updateAdoption: Handler = async (req, res, next) => {
		try {
			const { aid, uid, pid } = req.params;
			if (!aid || !uid || !pid)
				throw new Error(
					'You must to provide an adoption id, user id and pet id'
				);
			const adoption = await this.adoptionService.getById(aid);
			if (!adoption)
				throw new NotFoundError(`Adoption id ${aid} not found`);

			// Logica para actualizar las propiedades de pets(User) y adopted(Pet) y owner(Pet)
			// de la adopcion a actualizar
			const oldUser = await this.userService.getById(
				adoption.owner._id.toString()!
			);
			const oldPet = await this.petService.getById(
				adoption.pet._id.toString()!
			);

			oldUser!.pets = oldUser!.pets?.filter(
				(item) => item.pet._id?.toString() !== oldPet?._id?.toString()
			);

			await this.userService.update(oldUser?._id?.toString()!, {
				pets: oldUser!.pets,
			} as UserEntity);
			await this.petService.update(oldPet?._id?.toString()!, {
				adopted: false,
				owner: undefined,
			} as PetEntity);

			// Logica para actualizar las propiedades de pets(User) y adopted(Pet) y owner(Pet)
			// de la adopcion con los nuevos datos
			const updateUser = await this.userService.getById(uid);
			const updatePet = await this.petService.getById(pid);

			if (!updateUser || !updatePet)
				throw new NotFoundError('User or pet not found');
			if (updatePet.adopted) throw new Error('Pet already adopted');

			updatePet.adopted = true;
			updatePet.owner = stringToObjectId(uid);

			await this.petService.update(pid, updatePet);
			if (
				!updateUser.pets?.some(
		
					(item) => item.pet._id?.toString() === pid
				)
			) {
	
				updateUser.pets?.push({ pet: stringToObjectId(pid) });
			}

			await this.userService.update(uid, updateUser);

			adoption.owner = stringToObjectId(uid);
			adoption.pet = stringToObjectId(pid);

			const adoptionUpdate = await this.adoptionService.update(
				aid,
				adoption
			);

			res.status(200).json({
				status: 'success',
				payload: adoptionUpdate,
			});
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