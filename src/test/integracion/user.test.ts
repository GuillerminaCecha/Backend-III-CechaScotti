import supertest from 'supertest';
import { expect } from 'chai';
import { loadEnvFile } from 'process';
import { UserEntity } from '../../entities/users.entity';
import { passwordValidation } from '../../utils/security';

loadEnvFile();
const request = supertest(`http://localhost:${process.env.PORT}/api/users`);

describe('Test de integracion de users', () => {
	let userTest: UserEntity | null;

	it('[GET] /api/users - Debe devolver un array de users', async () => {
		const { status, body } = await request.get('/');
		expect(status).to.be.equal(200);
		expect(body.payload).to.be.an('array');
	});

	it('[POST] /api/users - Debe crear un nuevo usuario', async () => {
		const newUser = {
			first_name: 'Pepe',
			last_name: 'Perez',
			email: 'pp3@gmail.com',
			password: '123',
		};

		const { status, body } = await request.post('/').send(newUser);

		userTest = body.payload;
		expect(status).to.be.equal(201);
		expect(body.payload).to.be.an('object');
		expect(body.payload.first_name).to.be.equal(newUser.first_name);
		expect(body.payload.last_name).to.be.equal(newUser.last_name);
		expect(body.payload.email).to.be.equal(newUser.email);
		expect(
			passwordValidation(body.payload.password, newUser.password)
		).to.be.equal(true);
	});

	it('[GET] /api/users/:uid - Debe devolver un el usuario con el id indicado', async () => {
		const { status, body } = await request.get(`/${userTest?._id}`);
		expect(status).to.be.equal(200);
		expect(body.payload.first_name).to.be.equal(userTest?.first_name);
		expect(body.payload.last_name).to.be.equal(userTest?.last_name);
		expect(body.payload.email).to.be.equal(userTest?.email);
		expect(body.payload.password).to.be.equal(userTest?.password);
	});

	it('[PUT] /api/users/:uid - Debe actualizar un usuario con el id indicado y devolverlo', async () => {
		const updateUser = {
			first_name: 'Guillermina',
			last_name: 'Cecha',
		};

		userTest!.first_name = updateUser.first_name;
		userTest!.last_name = updateUser.last_name;

		const { status, body } = await request
			.put(`/${userTest?._id}`)
			.send(updateUser);

		expect(status).to.be.equal(200);
		expect(body.payload.first_name).to.be.equal(updateUser.first_name);
		expect(body.payload.last_name).to.be.equal(updateUser.last_name);
		expect(body.payload.email).to.be.equal(userTest?.email);
		expect(body.payload.password).to.be.equal(userTest?.password);
	});

	it('[DELETE] /api/users/:uid - Debe borrar el usuario con el id indicado y devolverlo', async () => {
		const { status, body } = await request.delete(`/${userTest?._id}`);

		expect(status).to.be.equal(200);
		expect(body.payload.first_name).to.be.equal(userTest?.first_name);
		expect(body.payload.last_name).to.be.equal(userTest?.last_name);
		expect(body.payload.email).to.be.equal(userTest?.email);
		expect(body.payload.password).to.be.equal(userTest?.password);
	});
});