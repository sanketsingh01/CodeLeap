import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from './cloudinary.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarImages = [
  path.join(__dirname, '../assets/avatar1.webp'),
  path.join(__dirname, '../assets/avatar2.webp'),
  path.join(__dirname, '../assets/avatar3.webp'),
  path.join(__dirname, '../assets/avatar4.webp'),
  path.join(__dirname, '../assets/avatar5.webp'),
  path.join(__dirname, '../assets/avatar6.webp'),
  path.join(__dirname, '../assets/avatar7.webp'),
];

export async function uploadRandomAvatar(userId) {
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  const imagePath = avatarImages[randomIndex];

  const result = await cloudinary.uploader.upload(imagePath, {
    folder: 'codeleap/users',
    public_id: `user-${userId}-avatar`,
    overwrite: true,
  });

  return result.secure_url;
}
