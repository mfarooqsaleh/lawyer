import express from "express";
import {
  
    CreateComment,
    getAllComments,
    UpdateComment,
    deleteComment,
 
} from "../controllers/commentController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
router.route("/comment").post(protect,CreateComment);
router.route("/getcomment").get(getAllComments);
router.route("/deletecomment/:commentId").delete(protect,deleteComment);
router.route("/updatecomment/:commentId").put(protect, UpdateComment);








export default router;
