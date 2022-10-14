import axios from "axios";

const url = 'http://localhost:5001/';

export const fetchPosts = () => axios.get(url);
