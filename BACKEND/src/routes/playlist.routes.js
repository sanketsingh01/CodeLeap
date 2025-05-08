import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getPlayListDetails,
  removeProblemfromPlaylist,
} from '../controllers/playlist.controllers.js';
import { createPlaylistValidator } from '../validators/index.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.middleware.js';

const playlistRoutes = express.Router();

playlistRoutes.get('/', authMiddleware, getAllListDetails);

playlistRoutes.get(
  '/getPlaylistDetails/:playlistId',
  authMiddleware,
  getPlayListDetails,
);

playlistRoutes.post(
  '/create-playlist',
  authMiddleware,
  createPlaylistValidator(),
  handleValidationErrors,
  createPlaylist,
);

playlistRoutes.post(
  '/:playlistId/add-problem',
  authMiddleware,
  addProblemToPlaylist,
);

playlistRoutes.delete(
  '/deletePlaylist/:playlistId',
  authMiddleware,
  deletePlaylist,
);

playlistRoutes.delete(
  '/:playlistId/remove-problem',
  authMiddleware,
  removeProblemfromPlaylist,
);

export default playlistRoutes;
