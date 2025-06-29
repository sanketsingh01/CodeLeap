import express from 'express';
import dotenv from 'dotenv';
import userAuthRoutes from './routes/userAuth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import pgSession from 'connect-pg-simple';

import problemRoutes from './routes/problem.routes.js';
import executionRoute from './routes/execute-code.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import './utils/passort.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const pgStore = pgSession(session);

app.use(
  cors({
    origin: process.env.FONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: isProduction
      ? new pgStore({
          conString: process.env.DATABASE_URL,
          tableName: 'user_sessions',
          createTableIfMissing: true,
        })
      : undefined,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? '.codeleap.in' : undefined,
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hi, Welocome to LeapCode 🔥');
});

app.use('/api/v1/auth', userAuthRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute-code', executionRoute);
app.use('/api/v1/submission', submissionRoutes);
app.use('/api/v1/playlist', playlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
