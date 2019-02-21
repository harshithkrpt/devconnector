import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "./types";

// add a post
export const addpost = postdata => dispatch => {
  axios
    .post("/api/posts", postdata)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get post
export const getposts = () => dispatch => {
  dispatch(setpostloading());
  dispatch(clearerrors());
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

// delete post
export const deletepost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// add a like
export const addlike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getposts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// add a like
export const removelike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getposts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Set Loading State
export const setpostloading = () => {
  return {
    type: POST_LOADING
  };
};

// get post
export const getpost = id => dispatch => {
  dispatch(setpostloading());
  axios
    .get("/api/posts/" + id)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

// add a comment
export const addcomment = (id, commentdata) => dispatch => {
  dispatch(clearerrors());
  axios
    .post(`/api/posts/comment/${id}`, commentdata)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// delete a comment
export const deletecomment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// clear errors
export const clearerrors = () => dispatch => {
  return {
    type: CLEAR_ERRORS
  };
};
