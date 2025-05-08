import { db } from '../libs/db.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;

    const existingPlalist = await db.playlist.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existingPlalist) {
      return res
        .status(400)
        .json(new ApiError(400, 'Playlist with this name already exists'));
    }

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res
      .status(201)
      .json(new ApiResponse(200, playlist, 'Playlist created Successfully'));
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          playlists,
          'All playlists data fetched Successfully',
        ),
      );
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const getPlayListDetails = async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(404).json(new ApiError(404, 'Playlist not found'));
  }

  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json(new ApiError(404, 'Playlist not found'));
    }

    res
      .status(200)
      .json(new ApiResponse(200, playlist, 'Playlist Fetched Successfully'));
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, 'Invalid or missing problems'));
    }

    // Checking for existing problems in the playlist
    const existingProblems = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
      select: {
        problemId: true,
      },
    });

    if (existingProblems.length > 0) {
      const existingIds = existingProblems.map((p) => p.problemId);
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Some Problems already exist in the playlist: ${existingIds.join(
              ', ',
            )}`,
          ),
        );
    }

    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          problemsInPlaylist,
          'Problems added to playlist successfully',
        ),
      );
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(404).json(new ApiError(404, 'Playlist not found'));
  }

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, deletedPlaylist, 'Playlist deleted successfully'),
      );
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const removeProblemfromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res
        .status(400)
        .json(new ApiError(400, 'Invalid or missing problemsIds'));
    }

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          deletedProblem,
          'Problem removed from playlist successfully',
        ),
      );
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};
