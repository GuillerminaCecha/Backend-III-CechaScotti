import mongoose from 'mongoose';
import { logger } from '../../config/logger.config';
import { expect } from 'chai';
import { loadEnvFile } from 'process';
import Pet from '../../dao/Pets.dao';
import { PetEntity } from '../../entities/pet.entity';

loadEnvFile();
mongoose.connect(process.env.MONGODB_URI as string);

// Describir nuestro test
describe('Test PetDao', () => {
	const petDao = new Pet();
	let petTest: PetEntity | null;

	// Método que se ejecuta antes de todos los tests
	before(() => {
		logger.info('Inicio de todos los tests');
	});

	// // Método que se ejecuta antes de cada test
	// beforeEach(() => {
	// 	console.log('Se ejecuta un test individual');
	// });

	// Test individual
	it('Debe retornar todos las mascotas', async () => {
		const pets = await petDao.get();
		expect(pets).to.be.an('array');
		expect(pets).not.to.be.an('object');
	});

	it('Debe crear y retornar una mascota', async () => {
		const newPet = {
			name: 'Pepe',
			specie: 'Gato',
		};

		const pet = await petDao.create(newPet);
		petTest = pet;

		// Afirmación
		expect(pet).to.be.an('object');
		expect(pet).to.have.property('_id');
		expect(pet?.name).to.be.equal(newPet.name);
		expect(pet?.specie).to.be.equal(newPet.specie);
		expect(pet).to.have.property('adopted');
		expect(pet).to.have.property('owner');
		expect(pet).to.have.property('image');

		// Negación
		expect(pet).to.not.have.property('food');
		expect(pet).to.not.be.null;
		expect(pet).to.not.be.an('array');
	});

	it('Debe retornar una mascota por su id', async () => {
		// @ts-expect-error
		const pet = await petDao.getBy(petTest?._id);
		expect(pet).to.be.an('object');
		expect(pet).to.have.property('_id');
		expect(pet?.name).to.be.equal(petTest?.name);
		expect(pet?.specie).to.be.equal(petTest?.specie);
		expect(pet?.adopted).to.be.equal(petTest?.adopted);
		expect(pet?.owner).to.be.equal(petTest?.owner);
	});

	it('Debe actualizar una mascota', async () => {
		const updateData = {
			name: 'Juan',
			specie: 'Perro',
		};
		// @ts-expect-error
		const pet = await petDao.update(petTest?._id, updateData);
		petTest = pet;

		expect(pet).to.be.an('object');
		expect(pet).to.have.property('_id');
		expect(pet?.name).to.be.equal('Juan');
		expect(pet?.specie).to.be.equal(petTest?.specie);
		expect(pet?.adopted).to.be.equal(petTest?.adopted);
		expect(pet?.owner).to.be.equal(petTest?.owner);
	});

	it('Debe eliminar la mascota', async () => {
		// @ts-expect-error
		await petDao.delete(petTest?._id);
		// @ts-expect-error
		const pet = await petDao.getBy(petTest?._id);
		expect(pet).to.be.null;
	});

	// // Método que se ejecuta al finaliza cada test
	// afterEach(() => {
	// 	console.log('Test individual finalizado');
	// });
});