import { db } from '../libs/db.js';
import { ApiResponse } from '../utils/api-response.js';

export const getSubmission = async (req, res) => {
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
  } catch (error) {}
};
