import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { executeCode } from '../controllers/execute-Code.controllers.js';
import { executeCodeValidator } from '../validators/index.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';

const executionRoute = express.Router();

executionRoute.post(
  '/',
  authMiddleware,
  executeCodeValidator(),
  handleValidationErrors,
  executeCode,
);

export default executionRoute;
