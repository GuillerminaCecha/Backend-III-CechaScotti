import supertest from 'supertest';
import { expect } from 'chai';
import { loadEnvFile } from 'process';
import { AdoptionEntity } from '../../entities/adoption.entity';
import { stringToObjectId } from '../../config/mongo.config';

loadEnvFile();
const request = supertest(`http://localhost:${process.env.PORT}/api/adoptions`);

describe('Test de integracion de adoptions', () => {
	let adoptionTest: AdoptionEntity | null;

	it('[GET] /api/adoptions - Debe devolver un array de adoptions', async () => {
		const { status, body } = await request.get('/');
		expect(status).to.be.equal(200);
		expect(body.payload).to.be.an('array');
	});

	it('[POST] /api/adoptions/user/:uid/pet/:pid - Debe crear un nuevo adoption', async () => {
		const uid = '670f19b698a52104d0d66f16'; // user ID de prueba
		const pid = '670f184019f77e56a8fac4f4'; // pet ID de prueba

		const { status, body } = await request.post(`/user/${uid}/pet/${pid}`);

		adoptionTest = body.payload;
		expect(status).to.be.equal(201);
		expect(body.payload).to.be.an('object');
		expect(body.payload.owner).to.be.equal(adoptionTest?.owner);
		expect(body.payload.pet).to.be.equal(adoptionTest?.pet);
	});

	it('[GET] /api/adoptions/:aid - Debe devolver un adoption con el id indicado', async () => {
		const { status, body } = await request.get(`/${adoptionTest?._id}`);
		expect(status).to.be.equal(200);

		expect(body.payload.owner._id).to.be.equal(adoptionTest?.owner);
		expect(body.payload.pet._id).to.be.equal(adoptionTest?.pet);
	});

	it('[PUT] /api/adoptions/:aid/user/:uid/pet/:pid - Debe actualizar un adoption con el id indicado y devolverlo', async () => {
		const uid = '670f19b698a52104d0d66f17'; // new user ID de prueba
		const pid = '670f184019f77e56a8fac4f3'; // new pet ID de prueba

		const { status, body } = await request.put(
			`/${adoptionTest?._id}/user/${uid}/pet/${pid}`
		);

		adoptionTest!.owner = stringToObjectId(uid);
		adoptionTest!.pet = stringToObjectId(pid);

		expect(status).to.be.equal(200);
		expect(body.payload).to.be.an('object');
		expect(body.payload.owner._id).to.be.equal(
			adoptionTest?.owner.toString()
		);
		expect(body.payload.pet._id).to.be.equal(adoptionTest?.pet.toString());
	});

	it('[DELETE] /api/adoptions/:aid - Debe borrar el adoption con el id indicado y devolverlo', async () => {
		const { status, body } = await request.delete(`/${adoptionTest?._id}`);

		expect(status).to.be.equal(200);
		expect(body.payload.owner._id).to.be.equal(
			adoptionTest?.owner.toString()
		);
		expect(body.payload.pet._id).to.be.equal(adoptionTest?.pet.toString());
	});
});