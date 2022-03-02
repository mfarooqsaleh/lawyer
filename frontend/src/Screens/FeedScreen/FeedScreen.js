import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col,Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { login } from "../../actions/userActions";


import { useDispatch, useSelector } from "react-redux";
import {  listFeeds } from "../../actions/postActions";
import CommentFeed from "./CommentFeed";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyFeeds({ history, search }) {
  const dispatch = useDispatch();

  const feedList = useSelector((state) => state.feedList);
  const { loading, error, posts,pic } = feedList;

  // const filteredposts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
 

  useEffect(() => {
    dispatch(listFeeds());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  
  ]);

  

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(posts)}
     
      {posts &&
        posts
          .reverse()
          .map((post) => (
            <div>
<Card style={{ width: '18rem' }}>
  
<Card.Img variant="top" src={post.user.pic} />
  <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Text>
    {post.content}
    </Card.Text>
    <div>
    
    
    </div>
    {userInfo.role==="lawyer"  &&  (
    <CommentFeed/>
    )}

  </Card.Body>
</Card>



  </div>
          ))}     
    </MainScreen>
  );
}

export default MyFeeds;
