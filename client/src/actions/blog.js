import * as api from "../api/blog";

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBlogs();
    const action = { type: "GET", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createBlogs = (newBlog) => async (dispatch) => {
  try {
    const { data } = await api.createBlogs(newBlog);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeBlogs = (blog, id) => async (dispatch) => {
  try {
    const { data } = await api.likeBlogs(blog, id);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogs = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteBlogs(id);
    dispatch({ type: "DELETE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateBlogs = (uBlog, id) => async (dispatch) => {
  try {
    const { data } = await api.updateBlogs(uBlog, id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
