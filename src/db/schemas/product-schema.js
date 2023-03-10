import { Schema } from 'mongoose';

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		size: { type: String, required: true },
		color: { type: String, required: true },
		price: { type: Number, required: true },
		categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'category' },
		detailDescription: { type: String, required: true },
		productImgName: { type: String, required: false },
		stock: { type: Number, default: 1 },
	},
	{
		collection: 'products',
		timestamps: true,
	},
);

export { ProductSchema };
