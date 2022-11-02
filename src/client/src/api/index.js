import axios from "axios";

const url = 'http://localhost:5001/';

export const fetchPosts = () => axios.get(`${url}discuss`);
export const createPost = (newPost) => axios.post(`${url}discuss/create`,newPost);
export const fetchPostById = (id) => axios.get(`${url}discuss/post/${id}`);
export const updatePost = (id,updatedPost) => axios.post(`${url}discuss/update${id}`,updatedPost);
export const deletePost = (id) => axios.post(`${url}discuss/post${id}`);
