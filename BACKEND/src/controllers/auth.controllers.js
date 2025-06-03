import bcrypt from 'bcryptjs';
import { db } from '../libs/db.js';
import { ApiError } from '../utils/api-error.js';
import crypto from 'crypto';
import { userRole } from '../generated/prisma/index.js';
import {
  mailVerificationMailGenContent,
  sendEmail,
} from '../utils/verificationMail.js';
import { ApiResponse } from '../utils/api-response.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateTokens.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ApiError(400, 'User already exists');
    }

    const HashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    const user = await db.user.create({
      data: {
        name,
        email,
        password: HashedPassword,
        role: userRole.USER,
        verificationToken: token,
      },
    });

    await sendEmail({
      email: email,
      subject: 'Email verification',
      mailGenContent: mailVerificationMailGenContent(
        name,
        `${process.env.BASE_URI}/api/v1/auth/verifyMail/${token}`,
      ),
    });

    console.log(user);
    res
      .status(201)
      .json(new ApiResponse(200, user, 'User registered successfully'));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          'Internall error Occured while registering the user',
          error,
        ),
      );
  }
};

const verifyUser = async (req, res) => {
  const token = req.params.token;
  console.log(token);
  if (!token) {
    throw new ApiError(400, 'Token not found');
  }

  try {
    const user = await db.user.findFirst({
      where: {
        verificationToken: token,
      },
    });

    if (!user) {
      throw new ApiError(400, 'User not found');
    }

    console.log(user.id);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    console.log(user);
    res
      .status(200)
      .json(new ApiResponse(200, user, 'User verified successfully'));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          'Internall error Occured while verifying the user',
          error,
        ),
      );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!user.isVerified) {
      throw new ApiError(401, 'User is not verified');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    const AccessCookieOptions = {
      httpOnly: true,
      samesite: 'strict',
      secure: process.env.NODE_ENv !== 'development',
      maxAge: 1000 * 60 * 5, // 5 minutes
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      samesite: 'strict',
      secure: process.env.NODE_ENv !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    res.cookie('accessToken', accessToken, AccessCookieOptions);
    res.cookie('refreshToken', refreshToken, RefreshCookieOptions);

    console.log(user);
    const loginUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
    res
      .status(200)
      .json(new ApiResponse(200, loginUser, 'User logged in successfully'));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(
        new ApiError(400, 'Internall error Occured while logging in', error),
      );
  }
};

const TokenRefresh = async (req, res) => {
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies?.refreshToken;

    console.log('Refresh Token found', refreshToken ? 'YES' : 'NO');
    if (!refreshToken) {
      throw new ApiError(403, 'Refresh token not found');
    }

    const user = await db.user.findFirst({
      where: {
        refreshToken,
      },
    });

    if (!user) {
      throw new ApiError(403, 'Invalid refresh token');
    }

    const decodedData = jwt.verify(
      refreshToken,
      process.env.JWT_REFERSH_TOKEN_SECRET,
    );
    console.log(decodedData);

    if (!decodedData) {
      throw new ApiError(403, 'Refresh Token Expired');
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    const AccessCookieOptions = {
      httpOnly: true,
      samesite: 'strict',
      secure: process.env.NODE_ENv !== 'development',
      maxAge: 1000 * 60 * 5, // 5 minutes
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      samesite: 'strict',
      secure: process.env.NODE_ENv !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    res.cookie('accessToken', newAccessToken, AccessCookieOptions);
    res.cookie('refreshToken', newRefreshToken, RefreshCookieOptions);

    console.log(user);
    res
      .status(200)
      .json(new ApiResponse(200, user, 'Tokens refreshed successfully'));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      samesite: 'strict',
      secure: process.env.NODE_ENv !== 'development',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      samesite: 'strict',
      secure: process.env.NODE_ENv !== 'development',
    });

    await db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        refreshToken: null,
      },
    });

    res.status(200).json(new ApiResponse(200, null, 'User logged out'));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const check = async (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, 'User authenticated successfully'));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ApiError(400, 'Error checking user'));
  }
};

export { register, verifyUser, login, TokenRefresh, logout, check };
