import mongoose, { Query, Schema } from 'mongoose';
import { PetEntity } from '../../entities/pet.entity';

const collection = 'Pets';

const schema = new mongoose.Schema<PetEntity>({
	name: {
		type: String,
		required: true,
	},
	specie: {
		type: String,
		required: true,
	},
	birthDate: {
		type: String,
		default: '01/01/2000',
	},
	adopted: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: false,
	},
	image: String,
});

schema.pre<Query<any, PetEntity>>(/^find/, function (next) {
	this.populate({
		path: 'owner',
		select: '-pets',
	});
	next();
});

const petModel = mongoose.model<PetEntity>(collection, schema);

export default petModel;