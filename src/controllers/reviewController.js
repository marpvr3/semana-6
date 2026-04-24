import { reviewModel } from '../models/reviewModel.js';

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate('recipe').sort({ createdAt: -1 });
    res.json({ status: 'ok', data: reviews });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error consultando reseñas' });
  }
};

export const saveReview = async (req, res) => {
  try {
    const { recipe, userName, comment, rating } = req.body;
    const review = await reviewModel.create({ recipe, userName, comment, rating });
    res.status(201).json({ status: 'ok', data: review });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error guardando reseña', detail: error.message });
  }
};
