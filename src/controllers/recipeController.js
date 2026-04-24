import { recipeModel } from '../models/recipeModel.js';

export const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find().sort({ createdAt: -1 });
    res.json({ status: 'ok', data: recipes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error consultando recetas' });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) return res.status(404).json({ status: 'error', message: 'Receta no encontrada' });
    res.json({ status: 'ok', data: recipe });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Id de receta inválido' });
  }
};

export const saveRecipe = async (req, res) => {
  try {
    const { title, description, category, restrictions, ingredients, preparation, image, preparationTime } = req.body;

    const recipe = await recipeModel.create({
      title,
      description,
      category,
      restrictions,
      ingredients,
      preparation,
      image,
      preparationTime,
    });

    res.status(201).json({ status: 'ok', data: recipe });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error guardando receta', detail: error.message });
  }
};
