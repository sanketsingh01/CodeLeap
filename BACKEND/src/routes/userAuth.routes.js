import express from 'express';
import {
  userRegistrationvalidator,
  userLoginValidator,
} from '../validators/index.js';
import {
  check,
  login,
  logout,
  register,
  TokenRefresh,
  verifyUser,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';

const router = express.Router();

router.post(
  '/register',
  userRegistrationvalidator(),
  handleValidationErrors,
  register,
);
router.get('/verifyMail/:token', verifyUser);
router.post('/login', userLoginValidator(), handleValidationErrors, login);
router.get('/refreshTokens', TokenRefresh);
router.get('/logout', authMiddleware, logout);
router.get('/check', authMiddleware, check);

export default router;
