import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, listPosts } from "../../actions/postActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./MyPosts.css";

function MyPosts({ history, search }) {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  // const filteredposts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate } = postCreate;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: successUpdate } = postUpdate;

  useEffect(() => {
    dispatch(listPosts());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePostAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(posts)}
      <Link to="/createpost">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new post
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {posts &&
        posts
          .filter((filteredPost) =>
            filteredPost.title.toLowerCase().includes(search.toLowerCase())
          )
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

                  <div>
                    <Button href={`/post/${post._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
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

export default MyPosts;
