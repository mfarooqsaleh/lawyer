import express from "express";
import {
  getPostById,
  getPosts,
  getAllPosts,
  CreatePost,
  DeletePost,
  UpdatePost,
} from "../controllers/postController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getPosts);
router.route("/feed").get(protect,getAllPosts);

router
  .route("/:id")
  .get(getPostById)

  .delete(protect, DeletePost)
  .put(protect, UpdatePost);
router.route("/create").post(protect, CreatePost);




export default router;
