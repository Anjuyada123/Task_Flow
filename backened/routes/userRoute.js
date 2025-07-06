import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/me', authMiddleware, getCurrentUser);
router.put('/update-profile', authMiddleware, updateProfile);
router.put('/update-password', authMiddleware, updatePassword);

//Export the correct router name
export default router;
