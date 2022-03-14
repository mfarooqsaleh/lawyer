import React, { useEffect,useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col,Card } from "react-bootstrap";

import { deletePostAction, listPosts } from "../../actions/postActions";

import { useDispatch, useSelector } from "react-redux";



function MyFeeds({ history, search }) {
  const dispatch = useDispatch();
  const [data,setData] = useState([])
  
  const [isEditing, setEditing] = useState(false);
  const [ucomment, setucomment] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
const feedList = useSelector((state) => state.feedList);
const [pic, setPic] = useState(
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
);

  // const filteredposts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    dispatch(listPosts());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  
  ]);

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) 
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData(); 
      data.append("file", pics);
      data.append("upload_preset", "smartleading");
      data.append("cloud_name", "smartleading");
      fetch("https://api.cloudinary.com/v1_1/smartleading/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };
 function editHandler(id){
 
    setEditing(true)
  
  }
function notEditing(){
  setTodoEditing(null)
}
function getComments(){
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
}
useEffect(()=>{
   getComments();
 },[])
 
 const deletePost = (id,commentid)=>{
 
    fetch(`/api/posts/comments/${id}/${commentid}`,{
        method:"delete",
        headers:{
          'Accept': 'application/json',
          "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
        },
        })
        .then(result=>{
         
            console.warn(result);
            getComments();

          })
           
      }

      function updateComments(text,id,commentid){
  
    fetch(`/api/posts/commentupdate/${id}/${commentid}`, {
      method: 'PUT',
      headers:{
        "Content-Type": "application/json",
  Authorization: `Bearer ${userInfo.token}`,
      },
      body:JSON.stringify({
        id,
        text,
        commentid
    })
    }).then((result) => {
      result.json().then((resp) => {
        getComments()
        setTodoEditing(null)
      })
    })
  }
  const makeComment = (text,postId,pic,email)=>{
    fetch('/api/posts/comment',{
        method:"put",
        headers:{
          "Content-Type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
        },
        body:JSON.stringify({
            postId,
            text,pic
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
      {data &&
        data
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
      post.comments.map((record,index)=>{
         return(
        
      <div key={record._id}>
 {record._id === todoEditing ? (
        <div> 
          <form
          onSubmit={(e)=>{
            e.preventDefault()
            updateComments(e.target[0].value,post._id,record._id);
            e.target.reset();
          }}> 

{ userInfo && userInfo.email ===record.postedBy.email && (
           <input
           type="text"
           onChange={(e) => setEditingText(e.target.value)}
         />)}
          </form>
       <div>
       </div>
       { userInfo && userInfo.email ===record.postedBy.email && (
   <button onClick={()=>{notEditing()}}>cancel</button>
       )}
   </div>

 ) : (
<div>
  <h6><span style={{fontWeight:"900"}}>{record.postedBy.name}</span>{record.text}</h6>
  { userInfo && userInfo.email ===record.postedBy.email  && (
    <span>
    <button onClick={()=>deletePost(post._id,record._id)}>delete</button>
    <button  onClick={() => setTodoEditing(record._id)}>Edit</button>
  
    </span>  )}  

    

  </div>
 )}
</div>
)})}
   {userInfo && userInfo.role=="lawyer"  &&  (
     <form onSubmit={(e)=>{
      e.preventDefault()
      makeComment(e.target[0].value,post._id);
      e.target.reset();
  }}>
        <input type="text" placeholder="add a comment" />  
       
  </form>
 )}              
  {userInfo && userInfo.role=="lawyer"  &&  (
     <form onSubmit={(e)=>{
      e.preventDefault()
      makeComment(e.target[0].value,post._id);
      e.target.reset();
  }}>
        <input

onChange={(e) => postDetails(e.target.files[0])}
id="custom-file"
type="file"
multiple
label="Upload Post Picture"
custom

/>    
       <button type="submit">Send</button>
  </form>
  )}               
    </div>  
  </Card.Body>
</Card>
 </div>
))}     

{console.log(userInfo && userInfo.email)}

   </MainScreen>
  );
}
export default MyFeeds;
