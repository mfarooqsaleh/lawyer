import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  res.json(posts);
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

//@description     Fetch single Post
//@route           GET /api/posts/:id
//@access          Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

//@description     Create single Post
//@route           GET /api/posts/create
//@access          Private
const CreatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const post = new Post({ user: req.user._id, title, content});

    const createdPost = await post.save();

    res.status(201).json(createdPost);
  }
});

//@description     Delete single Post
//@route           GET /api/posts/:id
//@access          Private
const DeletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (post) {
    await post.remove();
    res.json({ message: "Post Removed" });
  } else {
    res.status(404);
    throw new Error("Post not Found");
  }
});

// @desc    Update a post
// @route   PUT /api/potes/:id
// @access  Private
const UpdatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (post) {
    post.title = title;
    post.content = content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { getPostById, getPosts,getAllPosts, CreatePost, DeletePost,UpdatePost };
