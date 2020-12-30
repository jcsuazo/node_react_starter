import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import {
  getAllPosts,
  createPost,
  likeAPost,
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
router.route('/:id/like').put(protect, likeAPost);

// @desc    Get all posts | Create new post
// @route   GET /api/posts | POST /api/posts
// @access  Private | Private
router.route('/').get(protect, getAllPosts).post(protect, createPost);

export default router;
