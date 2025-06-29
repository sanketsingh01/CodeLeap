import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';

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
import { uploadRandomAvatar } from '../utils/avatarUtils.js';

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

    const avatarUrl = await uploadRandomAvatar(user.id);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
        image: avatarUrl,
      },
    });

    const AccessCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 15, // 15 minutes
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    res.cookie('accessToken', accessToken, AccessCookieOptions);
    res.cookie('refreshToken', refreshToken, RefreshCookieOptions);

    console.log(user);
    const registerUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      accessToken: user.accessToken,
    };
    res
      .status(201)
      .json(new ApiResponse(200, registerUser, 'User registered successfully'));
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

    const today = dayjs().startOf('day');
    const lastlogin = user.lastloginDate
      ? dayjs(user.lastloginDate).startOf('day')
      : null;
    const todayStr = dayjs().format('YYYY-MM-DD');
    const loginMap = user.loginMap || {};

    let streakCount = 1;
    let longestStreak = user.longestCount || 0;

    const oneYearAgo = dayjs().subtract(365, 'day').format('YYYY-MM-DD');
    const newLoginMap = Object.fromEntries(
      Object.entries(loginMap).filter(([date]) => date >= oneYearAgo),
    );

    // Mark today's login
    newLoginMap[todayStr] = true;

    if (lastlogin) {
      const diff = today.diff(lastlogin, 'day');
      if (diff === 1) {
        streakCount = user.streakCount + 1;
        longestStreak = Math.max(longestStreak, streakCount);
      } else if (diff === 0) {
        streakCount = user.streakCount;
        longestStreak = user.longestCount;
      }
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
        lastloginDate: new Date(),
        streakCount,
        longestCount: longestStreak,
        loginMap: newLoginMap,
      },
    });

    const AccessCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 15, // 15 minutes
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
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
      image: updatedUser.image,
      accessToken: user.accessToken,
      streakCount: updatedUser.streakCount,
      longestCount: updatedUser.longestCount,
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

const googleLogin = async (req, res) => {
  const user = req.user;

  try {
    console.log('=== GOOGLE LOGIN DEBUG ===');
    console.log('User from req.user:', user);
    console.log('Session ID:', req.sessionID);
    console.log('Session before:', req.session);
    console.log('Is Authenticated:', req.isAuthenticated());

    if (!user) {
      throw new ApiError(401, 'User not Found');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
      },
    });

    req.session.userId = user.id;
    req.session.isLoggedIn = true;

    const isProduction = process.env.NODE_ENV === 'production';

    const AccessCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      maxAge: 1000 * 60 * 15, // 15 minutes
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    res.cookie('accessToken', accessToken, AccessCookieOptions);
    res.cookie('refreshToken', refreshToken, RefreshCookieOptions);

    console.log('Session after:', req.session);
    console.log(
      'Cookies set, redirecting to:',
      `${process.env.FONTEND_URL}/problems`,
    );

    res.redirect(`${process.env.FONTEND_URL}/problems`);
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
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });

    const AccessCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 15, // 15 minutes
    };

    const RefreshCookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    res.cookie('accessToken', newAccessToken, AccessCookieOptions);
    res.cookie('refreshToken', newRefreshToken, RefreshCookieOptions);

    console.log(user);
    const RefreshedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
    res
      .status(200)
      .json(
        new ApiResponse(200, RefreshedUser, 'Tokens refreshed successfully'),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    await db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        accessToken: null,
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

export {
  register,
  verifyUser,
  login,
  TokenRefresh,
  logout,
  check,
  googleLogin,
};
