import {
    COMMENT_UPDATE_REQUEST,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_UPDATE_FAIL,
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    
  } from "../constants/commentConstants";
  
  
  export const commentListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
      case COMMENT_LIST_REQUEST:
        return { loading: true };
      case COMMENT_LIST_SUCCESS:
        return { loading: false, comment: action.payload };
      case COMMENT_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENT_CREATE_REQUEST:
        return { loading: true };
      case COMMENT_CREATE_SUCCESS:
        return { loading: false, success: true };
      case COMMENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENT_DELETE_REQUEST:
        return { loading: true };
      case COMMENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COMMENT_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const postUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMENT_UPDATE_REQUEST:
        return { loading: true };
      case COMMENT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case COMMENT_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  