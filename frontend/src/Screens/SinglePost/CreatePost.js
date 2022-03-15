import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../actions/postActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreatePost({ location,history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);



  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, error, post } = postCreate;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
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
      return setPicMessage("Please Select an Image");
    }
  };

  console.log(post);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => { 
    e.preventDefault();
    dispatch(createPostAction(title, content, category,pic));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/myposts");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Post">
      <Card>
        <Card.Header>Create a new Post</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Post Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

<Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />

{picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
        <Form.Group controlId="pic">
<Form.Label>Profile Picture</Form.Label>
<input

onChange={(e) => postDetails(e.target.files[0])}
id="custom-file"
type="file"
multiple
label="Upload Post Picture"
custom="true"

/>          
</Form.Group>
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Post
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreatePost;
