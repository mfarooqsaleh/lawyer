import React, { useEffect,useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col,Card } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";


import { useDispatch, useSelector } from "react-redux";
import req from "express/lib/request";



function MyFeeds({ history, search }) {
  const dispatch = useDispatch();
  const [data,setData] = useState([])
  const [isEditing, setEditing] = useState(false);
  const [ucomment, setucomment] = useState("");

const feedList = useSelector((state) => state.feedList);
const [pic, setPic] = useState(
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
);

  // const filteredposts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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



 function editHandler(){
setEditing(true);
}
function notEditing(){
  setEditing(false);
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
        notEditing()
      })
    })
  }
  const makeComment = (text,postId,pic)=>{
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
           
          
     
      {console.log('data',data)}

     
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
        
      <div>
 {isEditing && (
        <div>  <form
          onSubmit={(e)=>{
            e.preventDefault()
            updateComments(e.target[0].value,post._id,record._id);
            e.target.reset();
          }}> <input type="text" placeholder="" defaultValue={record.text}/>  
          
          </form>

       <div>
       </div>
   <button onClick={()=>{notEditing()}}>cancel</button></div>

 )}

    <h6 key={record._id}><span style={{fontWeight:"900"}}>{record.postedBy.name}</span>{record.text}</h6>
    { record.postedBy._id === userInfo._id && (
      <span>

      <button onClick={()=>deletePost(post._id,record._id)}>delete</button>
      <button onClick={editHandler}>Edit</button>
      </span>  
      )}
    
</div>
)})}
  

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
