import { body } from 'express-validator';

const userRegistrationvalidator = () => {
  return [
    body('mail')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username should at least 3 charcaters long')
      .isLength({ max: 15 })
      .withMessage("username Shouldn't be more than 15 charcters"),
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

export { userRegistrationvalidator, userLoginValidator };
