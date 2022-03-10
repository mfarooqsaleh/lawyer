import express from "express";
import {
  
    CreateComment,
    getAllComments,
    UpdateComment,
    deleteComment,
 
} from "../controllers/commentController.js";
import Comment from "../models/commentModel.js";

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.put('/comment',protect,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Comment.findByIdAndUpdate(req.body.postId,{
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
  
router.route("/commentss").post(protect,CreateComment);
router.route("/getcomment").get(getAllComments);
router.route("/deletecomment/:commentId").delete(protect,deleteComment);
router.route("/updatecomment/:commentId").put(protect, UpdateComment);








export default router;
