import { fakerES_MX as faker } from '@faker-js/faker';
import { createHash } from '../utils/security';
import { UserEntity } from '../entities/users.entity';

export const generateUsersMock = async (
	amount: number
): Promise<UserEntity[]> => {
	const users = [];
	for (let i = 0; i < amount; i++) {
		const user = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: createHash('coder123'),
			role: faker.datatype.boolean() ? 'user' : 'admin',
			pets: [],
		};
		users.push(user);
	}

	return users;
};