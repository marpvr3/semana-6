import express from 'express';
import { getRecipes, getRecipeById, saveRecipe } from '../controllers/recipeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', authMiddleware, saveRecipe);

export default router;
