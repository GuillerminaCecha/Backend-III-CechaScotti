import { PetEntity } from './pet.entity';

export class UserEntity {
	public _id?: string;
	public first_name!: string;
	public last_name!: string;
	public email!: string;
	public password!: string;
	public role?: string;
	public pets?: PetEntity[];
}