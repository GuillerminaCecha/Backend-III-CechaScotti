import mongoose, { Query, Schema } from 'mongoose';
import { AdoptionEntity } from '../../entities/adoption.entity';

const collection = 'Adoptions';

const schema = new mongoose.Schema<AdoptionEntity>({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	pet: {
		type: Schema.Types.ObjectId,
		ref: 'Pets',
	},
});

schema.pre<Query<any, AdoptionEntity>>(/^find/, function (next) {
	this.populate({
		path: 'owner',
		select: '-pets',
	}).populate({
		path: 'pet',
		select: '-owner',
	});
	next();
});
const adoptionModel = mongoose.model<AdoptionEntity>(collection, schema);

export default adoptionModel;