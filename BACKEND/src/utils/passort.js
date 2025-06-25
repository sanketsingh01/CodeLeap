import passport from 'passport';
import { Strategy as GoogleStartegy } from 'passport-google-oauth20';
import { db } from '../libs/db.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStartegy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              name: profile.displayName,
              email,
              isVerified: true,
              image: profile.photos[0].value,
              role: 'USER',
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  done(null, user);
});
