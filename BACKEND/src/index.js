import express from 'express';
import dotenv from 'dotenv';
import userAuthRoutes from './routes/userAuth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import problemRoutes from './routes/problem.routes.js';
import executionRoute from './routes/execute-code.routes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    Credentials: true,
    methods: ['GET', 'PUSH', 'PUT', 'PATCH', 'DELETE'],
    allowheaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hi, Welocome to LeapCode 🔥');
});

app.use('/api/v1/auth', userAuthRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute-code', executionRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
