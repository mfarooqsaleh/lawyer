import Comment from "../models/commentModel.js";

import asyncHandler from "express-async-handler";


const CreateComment = asyncHandler(async (req, res) => {
    const { content,postId } = req.body;
  
    if (!content) {
      res.status(400);
      throw new Error("Please Fill the feilds");
      return;
    } else {
      const comment = new Comment({user: req.user._id,content});
  
      const createdComment = await comment.save();
  
      res.status(201).json(createdComment);
    }
  });

  const getAllComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({ post:req.params.postId }).populate("user");
    res.json(comments);
  });


  const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);
  
    if(comment.user.toString() !== req.user._id.toString()){
      res.status(401);
      throw new Error("You can't perform this action");
    
    }
  
    if (comment) {
      await comment.remove();
      res.json({ message: "Comment Removed" });
    } else {
      res.status(404);
      throw new Error("Comment not Found");
    }
  });

  const UpdateComment = asyncHandler(async (req, res) => {
    const {content} = req.body;
  
    const comment = await Comment.findById(req.params.commentId);
  
    
  
    if (comment) {
     
      comment.content = content;
    
  
      const updatedComment = await comment.save();
      res.json(updatedComment);
    } else {
      res.status(404);
      throw new Error("Comment not found");
    }
  });

  export {CreateComment,getAllComments,deleteComment,UpdateComment };
