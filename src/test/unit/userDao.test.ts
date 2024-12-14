import mongoose from 'mongoose';
import Users from '../../dao/Users.dao';
import { UserEntity } from '../../entities/users.entity';
import { logger } from '../../config/logger.config';
import { expect } from 'chai';
import { loadEnvFile } from 'process';

loadEnvFile();
mongoose.connect(process.env.MONGODB_URI as string);

// Describir nuestro test
describe('Test UserDao', () => {
	const userDao = new Users();
	let userTest: UserEntity | null;

	// Método que se ejecuta antes de todos los tests
	before(() => {
		logger.info('Inicio de todos los tests');
	});

	// // Método que se ejecuta antes de cada test
	// beforeEach(() => {
	// 	console.log('Se ejecuta un test individual');
	// });

	// Test individual
	it('Debe retornar todos los usuarios', async () => {
		const users = await userDao.get();
		expect(users).to.be.an('array');
		expect(users).not.to.be.an('object');
	});

	it('Debe crear y retornar un usuario', async () => {
		const newUser = {
			first_name: 'Pepe',
			last_name: 'Perez',
			email: 'pp2@gmail.com',
			password: '123',
			age: 30,
			birthDate: '05/07/1993',
		};

		const user = await userDao.create(newUser);
		userTest = user;

		// Afirmación
		expect(user).to.be.an('object');
		expect(user).to.have.property('_id');
		expect(user?.first_name).to.be.equal(newUser.first_name);
		expect(user?.last_name).to.be.equal(newUser.last_name);
		expect(user?.email).to.be.equal(newUser.email);
		expect(user?.password).to.be.equal(newUser.password);
		expect(user?.role).to.be.equal('user');

		// Negación
		expect(user).to.not.have.property('age');
		expect(user).to.not.have.property('birthDate');
		expect(user).to.not.be.null;
		expect(user).to.not.be.an('array');
	});

	it('Debe retornar un usuario por su id', async () => {
		// @ts-expect-error
		const user = await userDao.getBy(userTest?._id);
		expect(user).to.be.an('object');
		expect(user).to.have.property('_id');
		expect(user?.first_name).to.be.equal(userTest?.first_name);
		expect(user?.last_name).to.be.equal(userTest?.last_name);
		expect(user?.email).to.be.equal(userTest?.email);
		expect(user?.password).to.be.equal(userTest?.password);
	});

	it('Debe actualizar un usuario', async () => {
		const updateData = {
			first_name: 'Juan',
			password: '321',
		};
		// @ts-expect-error
		const user = await userDao.update(userTest?._id, updateData);
		expect(user).to.be.an('object');
		expect(user).to.have.property('_id');
		expect(user?.first_name).to.be.equal('Juan');
		expect(user?.last_name).to.be.equal(userTest?.last_name);
		expect(user?.email).to.be.equal(userTest?.email);
		expect(user?.password).to.be.equal('321');
	});

	it('Debe eliminar el usuario', async () => {
		// @ts-expect-error
		await userDao.delete(userTest?._id);
		// @ts-expect-error
		const user = await userDao.getBy(userTest?._id);
		expect(user).to.be.null;
	});

	// // Método que se ejecuta al finaliza cada test
	// afterEach(() => {
	// 	console.log('Test individual finalizado');
	// });

	// Método que se ejecuta al finalizar todos los test
	after(async () => {
		logger.info('Tests finalizados');
		mongoose.disconnect();
	});
});