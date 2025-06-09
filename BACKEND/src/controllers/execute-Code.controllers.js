import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from '../libs/judge0.lib.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { db } from '../libs/db.js';

export const executeCode = async (req, res) => {
  try {
    const {
      sourceCode,
      language_id,
      stdin,
      expectedOutputs,
      problemId,
      store, // true for "Submit", false for "Run"
    } = req.body;

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

    // Prepare Judge0 submissions
    const Submissions = stdin.map((input) => ({
      source_code: sourceCode,
      language_id,
      stdin: input,
    }));

    const submitResponse = await submitBatch(Submissions);
    const tokens = submitResponse.map((r) => r.token);
    const results = await pollBatchResults(tokens);

    let allPassed = true;

    const detailedResults = results.map((result, index) => {
      const stdout = result.stdout?.trim();
      const expected_output = expectedOutputs[index]?.trim();
      const passed = stdout === expected_output;
      if (!passed) allPassed = false;

      return {
        testcase: index + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compileOutput: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    let submissionWithTestCase;

    // Handle "Submit Code" (store === true)
    if (store) {
      const submission = await db.submission.create({
        data: {
          userId,
          problemId,
          sourceCode: sourceCode,
          language: getLanguageName(language_id),
          stdin: stdin.join('\n'),
          stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
          stderr: detailedResults.some((r) => r.stderr)
            ? JSON.stringify(detailedResults.map((r) => r.stderr))
            : null,
          compileOutput: detailedResults.some((r) => r.compileOutput)
            ? JSON.stringify(detailedResults.map((r) => r.compileOutput))
            : null,
          status: allPassed ? 'Accepted' : 'Wrong Answer',
          memory: detailedResults.some((r) => r.memory)
            ? JSON.stringify(detailedResults.map((r) => r.memory))
            : null,
          time: detailedResults.some((r) => r.time)
            ? JSON.stringify(detailedResults.map((r) => r.time))
            : null,
        },
      });

      // Save test case results in DB
      await db.testCaseResult.createMany({
        data: detailedResults.map((result) => ({
          submissionId: submission.id,
          testcase: result.testcase,
          passed: result.passed,
          stdout: result.stdout,
          expected: result.expected,
          stderr: result.stderr,
          compileOutput: result.compileOutput,
          status: result.status,
          memory: result.memory,
          time: result.time,
        })),
      });

      // Mark problem as solved if passed
      if (allPassed) {
        await db.problemSolved.upsert({
          where: {
            userId_problemId: {
              userId,
              problemId,
            },
          },
          update: {},
          create: {
            userId,
            problemId,
          },
        });
      }

      // Include testcases in response
      submissionWithTestCase = {
        ...submission,
        testcases: detailedResults,
      };
    } else {
      // "Run Code" only — no DB write
      submissionWithTestCase = {
        id: null, // no DB id
        sourceCode,
        language: getLanguageName(language_id),
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        memory: JSON.stringify(detailedResults.map((r) => r.memory)),
        time: JSON.stringify(detailedResults.map((r) => r.time)),
        testcases: detailedResults,
      };
    }

    if (store) {
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            submissionWithTestCase,
            'Code Submitted Successfully',
          ),
        );
    } else {
      res
        .status(200)
        .json(
          new ApiResponse(200, submissionWithTestCase, 'Code Run Successfully'),
        );
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};
