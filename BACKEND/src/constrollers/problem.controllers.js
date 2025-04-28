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

export { createProblem };
