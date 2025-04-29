import { pollBatchResults, submitBatch } from '../libs/judge0.lib.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

export const executeCode = async (req, res) => {
  try {
    const { sourceCode, language_id, stdin, expectedOutputs, problemId } =
      req.body;

    const userId = req.user.id;

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expectedOutputs) ||
      expectedOutputs.length !== stdin.length
    ) {
      return res
        .status(400)
        .json(new ApiError(400, 'Invalid or Missing testcases'));
    }

    const Submissions = stdin.map((input) => ({
      source_code: sourceCode,
      language_id,
      stdin: input,
    }));

    const submitResponse = await submitBatch(Submissions);

    const tokens = submitResponse.map((r) => r.token);

    const results = await pollBatchResults(tokens);
    console.log('Response------------');
    console.log(results);

    res.status(200).json(new ApiResponse(200, results, 'Code Executed'));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};
