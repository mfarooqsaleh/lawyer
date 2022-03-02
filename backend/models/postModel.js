import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
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
      required: true,
      ref: "User",
    },

    comment:[{
      content:String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

}]
    
   
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", noteSchema);

export default Post;
