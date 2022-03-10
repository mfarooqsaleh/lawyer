import express, { text } from "express";
import {
  getPostById,
  getPosts,deleteComment,

  getAllPosts,
  CreatePost,

  DeletePost,
  UpdatePost,
} from "../controllers/postController.js";
import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";

import Comment from "../models/commentModel.js";


const router = express.Router();



import { protect } from "../middleware/authMiddleware.js";

router.delete("/comments/:postId/:commentId", async function (req, res) {
  try {
    
    const post = await Post.findOneAndUpdate({_id:req.params.postId }, 
     
    
    { $pull: {  comments: {_id:req.params.commentId}} } )
   

    


    res.send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});






router.get('/allpost',protect,(req,res)=>{
  Post.find()
  .populate("comments.postedBy","name _id ")
  .populate("postedBy"," name _id ")

  .sort('-createdAt')
  .then((posts)=>{
      res.json({posts})
  }).catch(err=>{
      console.log(err)
  })
  
})






router.put('/comment',protect,(req,res)=>{
  const comment = {
      text:req.body.text,
      pic:req.body.pic,

      postedBy:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
      $push:{comments:comment}
  },{
      new:true
  })
  .populate("comments.postedBy","name _id pic ")
  .populate("postedBy"," name _id ")


  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
})

router.put('/commentupdate/:postId/:commentId',protect,async(req,res)=>{
  const comment = { _id: req.params.postId, "comments._id": req.params.commentId };
  const updateDocument = {
      $set: { "comments.$.text":req.body.text }
    };
    const result = await Post.updateOne(comment, updateDocument);
    res.json(result);
})



router.route("/").get(protect, getPosts);
router.route("/feed").get(protect,getAllPosts);

router
  .route("/:id")
  .get(getPostById)

  .delete(protect, DeletePost)
  .put(protect, UpdatePost);
router.route("/create").post(protect, CreatePost);





export default router;
