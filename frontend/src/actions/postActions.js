import {
    POSTS_CREATE_FAIL,
    POSTS_CREATE_REQUEST,
    POSTS_CREATE_SUCCESS,
    POSTS_DELETE_FAIL,
    POSTS_DELETE_REQUEST,
    POSTS_DELETE_SUCCESS,
    POSTS_LIST_FAIL,
    POSTS_LIST_REQUEST,
    POSTS_LIST_SUCCESS,
    POSTS_UPDATE_FAIL,
    POSTS_UPDATE_REQUEST,
    POSTS_UPDATE_SUCCESS,
    FEEDS_LIST_REQUEST,
    FEEDS_LIST_SUCCESS,
    FEEDS_LIST_FAIL,
  } from "../constants/postConstants";
  import axios from "axios";
  
  export const listPosts = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/posts`, config);
  
      dispatch({
        type: POSTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const listFeeds = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: FEEDS_LIST_REQUEST,
      });
  

      
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/posts/feed`, config);
  
      dispatch({
        type: FEEDS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: FEEDS_LIST_FAIL,
        payload: message,
      });
    }
  };










  
  export const createPostAction = (title, content) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
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
        `/api/posts/create`,
        { title, content},
        config
      );
  
      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deletePostAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_DELETE_REQUEST,
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
        type: POSTS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updatePostAction = (id, title, content) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
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
        { title, content},
        config
      );
  
      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  