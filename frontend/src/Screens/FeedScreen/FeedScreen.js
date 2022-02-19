import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import {  listFeeds } from "../../actions/postActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
//import "./MyPosts.css";

function MyFeeds({ history, search }) {
  const dispatch = useDispatch();

  const feedList = useSelector((state) => state.feedList);
  const { loading, error, posts } = feedList;

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
            <Accordion>
              <Card style={{ margin: 10 }} key={post._id}>
                <Card.Header style={{ display: "flex" }}>

                <Accordion
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,}}
                
                
                >
  <Accordion.Item eventKey="0"
   
  >


    <Accordion.Header key={post.title}>{post.title}</Accordion.Header>
    <Accordion.Body>
    <ReactMarkdown key={post.content}>{post.content}</ReactMarkdown>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

                 
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  
                    <blockquote className="blockquote mb-0">
                    
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {post.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}     
    </MainScreen>
  );
}

export default MyFeeds;
