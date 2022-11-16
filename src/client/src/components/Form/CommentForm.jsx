import {useContext, useState} from "react";
import {UserContext} from "../../context/User";
import axios from "axios";
import {API_URL} from "../../context/Const";
import {useNavigate} from "react-router-dom";

const CommentForm = ({postId}) => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [text,setText] = useState("");

    const hasText = text.length ===0;

    const handleSubmit = (e) => {
        const newComment = {
            postId: postId,
            userId: user._id,
            message: text
        };
        // const { postId, userId, message } = req.body;
        axios.post(`${API_URL}/discuss/comment`,newComment).then((res) => console.log(res) ,(err)=>{
            console.log(err);
        })
        navigate(`/discussion/post/${postId}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(text);
        setText("");
    }

    return (
        <form className="mb-4" onSubmit={onSubmit}>
            <h6>write comment</h6>
            <textarea className="comment-form-textarea w-100 p-2 mt-2" value = {text} onChange={(e)=>setText(e.target.value)}/>
            <button className="btn btn-primary mt-2" disabled={hasText}>write</button>
        </form>
    );
};


export default CommentForm;
