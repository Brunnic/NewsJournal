import axios from "axios";
import {
  GET_POST,
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_ERROR
} from "./types";
import { setAlert } from "./alerts";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const getPosts = () => async dispatch => {
  try {
    const result = await axios.get("/api/posts", config);

    dispatch({
      type: GET_POSTS,
      payload: result.data
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response
      }
    })
  }
};

export const createPost = (data, history) => async dispatch => {
  try {
    const jsonData = JSON.stringify(data);

    const result = await axios.post("/api/create/post", jsonData, config);

    dispatch({
      type: ADD_POST,
      payload: result.data
    });

    dispatch(getPosts());

    history.push("/");

  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response
      }
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    const result = await axios.get("/api/post/" + id);

    dispatch({
      type: GET_POST,
      payload: result.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response
      }
    });
  }
};

export const deletePost = id => async dispatch => {
  try {
    const result = await axios.delete("/api/delete/post/" + id);

    dispatch({
      type: DELETE_POST,
      payload: result.data
    });

    dispatch(getPosts());

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response
      }
    });
  }
};

export const updatePost = (id, data, history) => async dispatch => {
  try {
    if(!data.title || !data.body) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: "Please fill in all the forms"
        }
      });

      dispatch(setAlert("Please fill in all the forms"));
      history("/edit/" + id);
    }

    const result = await axios.put("/api/edit/post/" + id, data);

    dispatch({
      type: UPDATE_POST,
      payload: result.data
    });

    dispatch(getPosts());

    history.push("/");
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response
      }
    });
  }
};