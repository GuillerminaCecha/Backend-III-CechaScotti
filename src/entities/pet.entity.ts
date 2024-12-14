import mongoose from 'mongoose';

export class PetEntity {
	public _id?: string;
	public name!: string;
	public specie!: string;
	public birthDate?: string;
	public adopted?: boolean;
	public owner?: mongoose.Types.ObjectId;
	public image?: string;
}