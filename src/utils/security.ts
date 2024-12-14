import bcryptjs from 'bcryptjs';
import { dirname, join } from 'path';

export const createHash = (password: string): string => {
	const salts = bcryptjs.genSaltSync(10);
	return bcryptjs.hashSync(password, salts);
};

export const passwordValidation = (
	hashedPassword: string,
	password: string
): boolean => bcryptjs.compareSync(password, hashedPassword);

export const __dirname = dirname(
	dirname(join(process.cwd(), 'src', 'utils', 'security.ts'))
);