import mongoose from "mongoose";

const postsSchema = mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
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



const Posts = mongoose.model("Posts", postsSchema);

export default Posts;

