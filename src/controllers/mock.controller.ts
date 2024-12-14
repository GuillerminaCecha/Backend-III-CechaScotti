import { Handler } from 'express';
import { UserServices } from '../services/user.services';
import { generateUsersMock } from '../mocks/user.mock';
import { generatePetsMock } from '../mocks/pets.mock';
import { PetServices } from '../services/pet.services';

export class MockController {
	private userServices = new UserServices();
	private petServices = new PetServices();

	constructor() {
		this.userServices = new UserServices();
	}

	createUserMocks: Handler = async (_req, res, next) => {
		try {
			const users = await generateUsersMock(5);
			const response = await this.userServices.createMany(users);

			res.status(201).json({ status: 'success', payload: response });
		} catch (error) {
			next(error);
		}
	};

	createPetMocks: Handler = async (_req, res, next) => {
		try {
			const pets = await generatePetsMock(5);
			const response = await this.petServices.createMany(pets);

			res.status(201).json({ status: 'success', payload: response });
		} catch (error) {
			next(error);
		}
	};

	generateData: Handler = async (req, res, next) => {
		try {
			const { uq, pq } = req.params;
			const users = await generateUsersMock(Number(uq));
			const pets = await generatePetsMock(Number(pq));
			const userResponse = await this.userServices.createMany(users);
			const petResponse = await this.petServices.createMany(pets);

			res.status(201).json({
				status: 'success',
				users: userResponse,
				pets: petResponse,
			});
		} catch (error) {
			next(error);
		}
	};
}