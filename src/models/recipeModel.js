import mongoose from 'mongoose';

const collection = 'recipes';

const schema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'El título de la receta es obligatorio'], trim: true },
    description: { type: String, required: [true, 'La descripción es obligatoria'], trim: true },
    category: { type: String, required: [true, 'La categoría es obligatoria'], trim: true },
    restrictions: [{ type: String, trim: true }],
    ingredients: [{ type: String, trim: true }],
    preparation: { type: String, required: [true, 'La preparación es obligatoria'], trim: true },
    image: { type: String, trim: true },
    preparationTime: { type: Number, min: 1 },
  },
  { timestamps: true }
);

export const recipeModel = mongoose.model(collection, schema);
