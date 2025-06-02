import { db } from '../libs/db.js';
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from '../libs/judge0.lib.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippet,
    refrenceSolution,
  } = req.body;

  if (req.user.role !== 'ADMIN') {
    return res
      .status(403)
      .json(new ApiError(403, 'You are not allowed to create a problem'));
  }

  try {
    for (const [language, solutionCode] of Object.entries(refrenceSolution)) {
      const languageId = getJudge0LanguageId(language);
      console.log(languageId);

      if (!languageId) {
        return res
          .status(400)
          .json(
            new ApiError(400, `Language ${language} is not supported yet!`),
          );
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((result) => result.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log('Result------', result);

        if (result.status.id !== 3) {
          return res
            .status(400)
            .json(
              new ApiError(
                400,
                `Testcase ${i + 1} failed for language ${language}`,
              ),
            );
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippet,
        refrenceSolution,
        userId: req.user.id,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, newProblem, 'New Problem is created successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!problems) {
      return res.status(404).json(new ApiError(404, 'No problems found'));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, problems, 'All problems Fetched Successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json(new ApiError(404, 'Problem Not Found.'));
    }

    res
      .status(200)
      .json(new ApiResponse(200, problem, 'Problem Fetched Successfully'));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippet,
    refrenceSolution,
  } = req.body;

  if (req.user.role !== 'ADMIN') {
    return res
      .status(400)
      .json(new ApiError(400, 'You are not allowed to update a problem'));
  }

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json(new ApiError(404, 'Problem Not Found'));
    }

    for (const [language, solutionCode] of Object.entries(refrenceSolution)) {
      const languageId = getJudge0LanguageId(language);
      console.log(languageId);

      if (!languageId) {
        return res
          .status(400)
          .json(
            new ApiError(400, `Language ${language} is not supported yet!`),
          );
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((result) => result.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log('Result------', result);

        if (result.status.id !== 3) {
          return res
            .status(400)
            .json(
              new ApiError(
                400,
                `Testcase ${i + 1} failed for language ${language}`,
              ),
            );
        }
      }
    }

    const UpdatedProblem = await db.problem.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippet,
        refrenceSolution,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, UpdatedProblem, 'Problem Updated Successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'ADMIN') {
    return res
      .status(400)
      .json(new ApiError(400, 'You are not allowed to delete a problem'));
  }

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json(new ApiError(404, 'Problem Not Found'));
    }

    await db.problem.delete({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Problem Deleted Successfully'));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    res
      .status(200)
      .json(new ApiResponse(200, '', 'Problems fetched Successfully'));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

export {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getAllProblemsSolvedByUser,
};
