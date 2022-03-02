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
  const dispatch = useDispatch();
  const [text, setText] = useState("");







  const commentList = useSelector((state) => state.commentList);
  const { comment } = commentList;


  



  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  
  useEffect(() => {
    dispatch(listComment());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  
  ]);
  


  // const filteredposts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLowerCase())
  // );

  
  const submitHandler = (e) => { 
    console.log(e.target.value)
    e.preventDefault();
    dispatch(createCommentAction(text));
    if ( !text ) return;
  }
  

  return (

    <div>
<Form onSubmit={submitHandler} >

          
         <input
                type="title"
                value={text}
                placeholder="Enter the title"
              onChange={(e) => setText(e.target.value)}
              />
           
            
            <Button type="submit" variant="primary">
              Enter Comment
            </Button>
</Form>


      </div>
     
);}
  
export default MyComments;
