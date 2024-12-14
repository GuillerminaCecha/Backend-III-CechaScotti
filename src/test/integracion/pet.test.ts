import supertest from 'supertest';
import { expect } from 'chai';
import { loadEnvFile } from 'process';
import { passwordValidation } from '../../utils/security';
import { PetEntity } from '../../entities/pet.entity';

loadEnvFile();
const request = supertest(`http://localhost:${process.env.PORT}/api/pets`);

describe('Test de integracion de pets', () => {
	let petTest: PetEntity | null;

	it('[GET] /api/pets - Debe devolver un array de pets', async () => {
		const { status, body } = await request.get('/');
		expect(status).to.be.equal(200);
		expect(body.payload).to.be.an('array');
	});

	it('[POST] /api/pets - Debe crear un nuevo pet', async () => {
		const newPet = {
			name: 'Toto',
			specie: 'perro',
			birthDate: '01/02/2010',
		};

		const { status, body } = await request.post('/').send(newPet);

		petTest = body.payload;
		expect(status).to.be.equal(201);
		expect(body.payload).to.be.an('object');
		expect(body.payload.name).to.be.equal(newPet.name);
		expect(body.payload.specie).to.be.equal(newPet.specie);
		expect(body.payload.birthDate).to.be.equal(newPet.birthDate);
	});

	it('[GET] /api/pets/:pid - Debe devolver un pet con el id indicado', async () => {
		const { status, body } = await request.get(`/${petTest?._id}`);
		expect(status).to.be.equal(200);
		expect(body.payload.name).to.be.equal(petTest?.name);
		expect(body.payload.specie).to.be.equal(petTest?.specie);
		expect(body.payload.birthDate).to.be.equal(petTest?.birthDate);
		expect(body.payload.adopted).to.be.equal(petTest?.adopted);
	});

	it('[PUT] /api/users/:uid - Debe actualizar un usuario con el id indicado y devolverlo', async () => {
		const updatePet = {
			name: 'Guillermina',
		};

		petTest!.name = updatePet.name;

		const { status, body } = await request
			.put(`/${petTest?._id}`)
			.send(updatePet);

		expect(status).to.be.equal(200);
		expect(body.payload.name).to.be.equal(petTest?.name);
		expect(body.payload.specie).to.be.equal(petTest?.specie);
		expect(body.payload.birthDate).to.be.equal(petTest?.birthDate);
		expect(body.payload.adopted).to.be.equal(petTest?.adopted);
	});

	it('[DELETE] /api/users/:uid - Debe borrar el usuario con el id indicado y devolverlo', async () => {
		const { status, body } = await request.delete(`/${petTest?._id}`);

		expect(status).to.be.equal(200);
		expect(body.payload.name).to.be.equal(petTest?.name);
		expect(body.payload.specie).to.be.equal(petTest?.specie);
		expect(body.payload.birthDate).to.be.equal(petTest?.birthDate);
		expect(body.payload.adopted).to.be.equal(petTest?.adopted);
	});
});