import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, updatePostAction } from "../../actions/postActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SinglePost({ match, history,location }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();


  const dispatch = useDispatch();

  const postUpdate = useSelector((state) => state.postUpdate);
  const { loading, error } = postUpdate;

  const postDelete = useSelector((state) => state.postDelete);
  const { loading: loadingDelete, error: errorDelete } = postDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePostAction(id));
    }
    history.push("/myposts");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/posts/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setPic(data.pic);

      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "smartt");
      data.append("cloud_name", "smartleading");
      fetch("https://api.cloudinary.com/v1_1/smartleading/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };


  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updatePostAction(match.params.id, title, content, category,pic));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/myposts");
  };

  return (
    <MainScreen title="Edit Post">
      <Card>
        <Card.Header>Edit your Post</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
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
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
            <Form.Group controlId="pic">
              <Form.Label>Change Profile Picture</Form.Label>
                <input
                 onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                  label="Upload Profile Picture"
                  custom="true"
                />
</Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Post
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Post
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SinglePost;
