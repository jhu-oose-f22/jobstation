import axios from "axios";
import { API_URL } from "../context/Const";

const DIS_URL = API_URL + '/discuss';

export const getAllDiscussions = (toggleDiscussion) => axios.get(DIS_URL).then(
    (res) => {
        toggleDiscussion(res.data);
    },
    (err) => {
        console.log(err);
    }
);
