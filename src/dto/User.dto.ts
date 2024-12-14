import { UserEntity } from '../entities/users.entity';

export default class UserDTO {
	static getUserInputFrom = (user: UserEntity): UserEntity => {
		return {
			// @ts-expect-error
			name: `${user.first_name} ${user.last_name}`,
			role: user.role,
			email: user.email,
		};
	};
}