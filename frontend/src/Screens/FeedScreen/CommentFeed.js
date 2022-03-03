import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col,Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { login } from "../../actions/userActions";
import {  listComment,createCommentAction } from "../../actions/commentActions";

import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
//import "./MyPosts.css";

function MyComments({history}) {
  const [data,setData] = useState([])
  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  
  


    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/api/posts/comment',{
              method:"put",
              headers:{
                "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

   return (
      <div>


                                  
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    console.log(e.target)
                                    makeComment(e.target[0].value)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                

           
          
       </div>
   )
                              }
export default MyComments;
