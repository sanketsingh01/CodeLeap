import { db } from '../libs/db.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const submission = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, submission, 'Submissions fetched successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const getSubmissionForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, submissions, 'Submissions fetched successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    const submissions = await db.submission.findMany({
      where: {
        problemId: problemId,
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, submissions, 'Submissions fetched successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};
