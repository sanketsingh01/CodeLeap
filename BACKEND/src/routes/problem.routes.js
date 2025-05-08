import express from 'express';
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
} from '../controllers/problem.controllers.js';
import { createAndUpdateProblemValidator } from '../validators/index.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';

const problemRoutes = express.Router();

problemRoutes.post(
  '/create-problem',
  authMiddleware,
  checkAdmin,
  createAndUpdateProblemValidator(),
  handleValidationErrors,
  createProblem,
);

problemRoutes.get('/get-all-problems', authMiddleware, getAllProblems);

problemRoutes.get('/get-problem/:id', authMiddleware, getProblemById);

problemRoutes.put(
  '/update-problem/:id',
  authMiddleware,
  checkAdmin,
  updateProblem,
);

problemRoutes.delete(
  '/delete-problem/:id',
  authMiddleware,
  checkAdmin,
  deleteProblem,
);

export default problemRoutes;
