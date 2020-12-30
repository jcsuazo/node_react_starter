import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getAllPosts = asyncHandler(async (req, res) => {
  const results = await getPosts({});
  res.status(200).send(results);
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    console.log('Content param not sent with request');
    return res.sendStatus(400);
  }
  try {
    const newPost = await Post.create({
      content,
      postedBy: req.user._id,
    });
    const newPostAndUser = await User.populate(newPost, { path: 'postedBy' });
    return res.status(201).send(newPostAndUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likeAPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  let isLiked = user.likes && user.likes.includes(id);

  let option = isLiked ? '$pull' : '$addToSet';
  // Insert user like
  await User.findByIdAndUpdate(
    user._id,
    {
      [option]: { likes: id },
    },
    { new: true },
  );
  //Insert post like
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      [option]: { likes: user._id },
    },
    { new: true },
  );

  res.status(200).send(updatedPost);
});

async function getPosts(filter) {
  const results = await Post.find(filter)
    .populate('postedBy')
    .populate('retweetData')
    .sort({ createdAt: -1 })
    .catch((error) => console.log(error));
  return await User.populate(results, { path: 'retweetData.postedBy' });
}
export { getAllPosts, createPost, likeAPost };
