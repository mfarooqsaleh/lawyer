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
    text: {
      type: String,
      required: true,
    },
    comments:[{
      text:String,
      postedBy:{type:mongoose.Types.ObjectId,ref:"User"}
  }],
    postedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
   }
  }, 
  
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
