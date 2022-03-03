import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types


const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
   
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
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

const Post = mongoose.model("Post", postSchema);

export default Post;
