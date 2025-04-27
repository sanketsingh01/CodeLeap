import express from 'express';
import dotenv from 'dotenv';
import userAuthRoutes from './routes/userAuth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
