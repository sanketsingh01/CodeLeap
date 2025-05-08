import { body } from 'express-validator';

const userRegistrationvalidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name should at least 3 charcaters long')
      .isLength({ max: 15 })
      .withMessage("Name Shouldn't be more than 15 charcters"),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('password should be at 8 Charcaters long')
      .isLength({ max: 15 })
      .withMessage("The password shouldn't be more than 15 charcaters long"),
  ];
};

const userLoginValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('Email is not valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Passowrd should be at least 8 characters long')
      .isLength({ max: 15 })
      .withMessage('The password should not be longer than 15 characters'),
  ];
};

const executeCodeValidator = () => {
  return [
    body('sourceCode')
      .notEmpty()
      .withMessage('Source code is required')
      .isString()
      .withMessage('Source code should be a string'),
    body('language_id')
      .notEmpty()
      .withMessage('Language id is required')
      .bail()
      .custom((value) => typeof value === 'number' && Number.isInteger(value))
      .withMessage('Language id should be an integer'),
    body('stdin').isArray().withMessage('stdin in should be an array'),
    body('expectedOutputs')
      .isArray()
      .withMessage('expectedOutputs should be an array'),
    body('problemId')
      .notEmpty()
      .withMessage('Problem id is required')
      .isString()
      .withMessage('Problem id should be a string'),
  ];
};

const createAndUpdateProblemValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title should be a string'),
    body('description')
      .notEmpty()
      .withMessage('Description is required')
      .isString()
      .withMessage('Description is required'),
    body('difficulty')
      .notEmpty()
      .withMessage('Difficulty is required')
      .isString()
      .withMessage('Difficulty should be a string'),
    body('tags')
      .notEmpty()
      .withMessage('Atleast one tag is required')
      .isArray()
      .withMessage('Tags should be an array'),
    body('examples')
      .notEmpty()
      .withMessage('Examples are required')
      .isObject()
      .withMessage('Examples should be an object'),
    body('constraints')
      .notEmpty()
      .withMessage('The constraints are required')
      .isString()
      .withMessage('The constraints should bae a string'),
    body('testcases')
      .notEmpty()
      .withMessage('At lest one testcase is required')
      .isArray()
      .withMessage('Testcases should be an array'),
    body('codeSnippet')
      .notEmpty()
      .withMessage('Code snippet is required')
      .isObject()
      .withMessage('Code snippet should be an object'),
    body('refrenceSolution')
      .notEmpty()
      .withMessage('Refrence solution for each codeSnippet is required')
      .isObject()
      .withMessage('Refrence solution should be an object'),
  ];
};

const createPlaylistValidator = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name o fPlaylist is required')
      .isString()
      .withMessage('Name of playlist should be a string'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description should be a string'),
  ];
};

export {
  userRegistrationvalidator,
  userLoginValidator,
  executeCodeValidator,
  createAndUpdateProblemValidator,
  createPlaylistValidator,
};
