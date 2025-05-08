import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
      new ApiError(
        400,
        errors
          .array()
          .map((e) => e.msg)
          .join(', '),
      ),
    );
  }
  next();
};
