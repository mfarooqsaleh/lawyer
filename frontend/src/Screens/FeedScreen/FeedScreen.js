import React, { useEffect,useState } from "react";
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
  const [data,setData] = useState([])

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

  useEffect(()=>{
    fetch('api/posts/allpost',{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setData(result.posts)
    })
 },[])
  

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
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(posts)}
     
      {data &&
        data
          .reverse()
          .map((post) => (
            <div>
<Card style={{ width: '18rem' }}>
  
<Card.Img variant="top" src={post.pic} />
  <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Text>
    {post.content}
    </Card.Text>
    <div>
    


    {
                                    post.comments.map(record=>{
                                        return(
                                          
    <h6 key={record._id}><span style={{fontWeight:"900"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
 {userInfo.role=="lawyer"  &&  (
     <form onSubmit={(e)=>{
      e.preventDefault()
      makeComment(e.target[0].value,post._id);
      e.target.reset();
  }}>
    <input type="text" placeholder="add a comment" />  
  </form>
  

    )}
                               
      
    
    </div>
    

  </Card.Body>
</Card>



  </div>
          ))}     
    </MainScreen>
  );
}

export default MyFeeds;
