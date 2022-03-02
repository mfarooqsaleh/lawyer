import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
   
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Post",
    },
    content: {
      type: String,
      required: true,
    },
 

  }, 
  
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
