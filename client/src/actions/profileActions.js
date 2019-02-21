import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

// Get current profile
export const getcurrentprofile = () => dispatch => {
  // profile loading
  dispatch(setprofileloading());
  // api
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Create Profile
export const createprofile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// profile loading
export const setprofileloading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// clear profile
export const clearcurrentprofile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// delete account and profile
export const deleteaccount = () => dispatch => {
  if (window.confirm("Are you sure This can Not be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};

export const addexperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addeducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteexperience = id => dispatch => {
  axios
    .delete("/api/profile/experience/" + id)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteeducation = id => dispatch => {
  axios
    .delete("/api/profile/education/" + id)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getprofiles = () => dispatch => {
  dispatch(setprofileloading());
  axios
    .get("/api/profile/all")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setprofileloading());

  axios
    .get("/api/profile/handle/" + handle)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};
