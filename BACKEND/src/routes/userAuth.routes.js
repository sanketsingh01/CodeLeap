import express from 'express';
import {
  userRegistrationvalidator,
  userLoginValidator,
} from '../validators/index.js';
import {
  check,
  googleLogin,
  login,
  logout,
  register,
  TokenRefresh,
  verifyUser,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';
import passport from 'passport';

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

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleLogin,
);

export default router;
