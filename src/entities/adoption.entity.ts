import mongoose from 'mongoose';

export class AdoptionEntity {
	public _id?: string;
	public owner!: mongoose.Types.ObjectId;
	public pet!: mongoose.Types.ObjectId;
}