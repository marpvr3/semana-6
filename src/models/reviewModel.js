import mongoose from 'mongoose';

const collection = 'reviews';

const schema = new mongoose.Schema(
  {
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'recipes', required: true },
    userName: { type: String, required: [true, 'El nombre del usuario es obligatorio'], trim: true },
    comment: { type: String, required: [true, 'El comentario es obligatorio'], trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const reviewModel = mongoose.model(collection, schema);
