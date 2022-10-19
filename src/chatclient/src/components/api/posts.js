import axios from "axios";
const url = null;
export default axios.create({
  baseURL: url || "http://localhost:3500"
});
