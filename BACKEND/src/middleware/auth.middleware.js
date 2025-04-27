import jwt from 'jsonwebtoken';
import { db } from '../libs/db.js';
import { ApiError } from '../utils/api-error.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiError(401, 'User is not authenticated');
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json(new ApiError(401, 'Unauthorized invalid token'));
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json(new ApiError(404, 'User not found'));
    }
    res.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(new ApiError(400, 'Error while authenticating'));
  }
};

export default authMiddleware;
