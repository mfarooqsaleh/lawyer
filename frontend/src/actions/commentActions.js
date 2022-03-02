import {
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_UPDATE_REQUEST,
    COMMENT_UPDATE_SUCCESS,
   
  } from "../constants/commentConstants";
  import axios from "axios";
  

  
     

  export const listComment = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENT_LIST_REQUEST,
      });
  

      
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/getcomment`, config);
  
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENT_LIST_FAIL,
        payload: message,
      });
    }
  };










  
  export const createCommentAction = (content,postId) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: COMMENT_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/comment`,
        { content,postId },
        config
      );
  
      dispatch({
        type: COMMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENT_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deletePostAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMMENT_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/posts/${id}`, config);
  
      dispatch({
        type: COMMENT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENT_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updatePostAction = (id, title, content,category,pic) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: COMMENT_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/posts/${id}`,
        { title, content,category,pic},
        config
      );
  
      dispatch({
        type: COMMENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COMMENT_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  