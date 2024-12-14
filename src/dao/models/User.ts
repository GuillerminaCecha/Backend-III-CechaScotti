import mongoose, { Query, Schema } from 'mongoose';
import { UserEntity } from '../../entities/users.entity';

const collection = 'Users';

const schema = new mongoose.Schema<UserEntity>({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'user',
	},
	pets: [
		{
			pet: {
				type: Schema.Types.ObjectId,
				ref: 'Pets',
			},
		},
	],
});

schema.pre<Query<any, UserEntity>>(/^find/, function (next) {
	this.populate({
		path: 'pets.pet',
	});
	next();
});

const userModel = mongoose.model<UserEntity>(collection, schema);

export default userModel;