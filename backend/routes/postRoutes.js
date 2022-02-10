import express from "express";
const router = express.Router();
import {create,findAll, findOne,update,del} from '../controllers/postController.js';

// Create a new post
router.route("/add").post(create);

// Retrieve all post Sorted
router.route("/findall").get(findAll);

// Retrieve a single post with postId
router.route("/findone/:postId").get(findOne);

// Update a Note with postId
router.route("/update/:postId").put(update);

// Delete a Note with postId
router.route("/del/:postId").delete(del);

export default router;
