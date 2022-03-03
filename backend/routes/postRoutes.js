import express from "express";
import {
  getPostById,
  getPosts,
  getAllPosts,
  CreatePost,
  DeletePost,
  UpdatePost,
} from "../controllers/postController.js";
import Post from "../models/postModel.js";

const router = express.Router();



import { protect } from "../middleware/authMiddleware.js";

router.get('/allpost',protect,(req,res)=>{
  Post.find()
  .populate("postedBy","_id name")
  .populate("comments.postedBy","_id name")
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
      postedBy:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
      $push:{comments:comment}
  },{
      new:true
  })
  .populate("comments.postedBy","name _id ")
  .populate("postedBy"," name _id ")


  .exec((err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }else{
          res.json(result)
      }
  })
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
