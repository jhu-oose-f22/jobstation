import { Comment } from "./Comment"
import {useEffect, useState} from "react";
import {API_URL} from "../../../context/Const";
import CommentForm from "../../Form/CommentForm";

export function CommentList({ postId }) {
//router.get('/discuss/post/:id/comments', getComments);
    const [comments,setComments] = useState([]);
    // useEffect
    useEffect(()=>{
        fetch(`${API_URL}/discuss/post/${postId}/comments`)
            .then((res) => res.json())
            .then((fetched) => {
                setComments(fetched);
            });
    },[])
    console.log(postId);
    console.log(comments.length);
    return(
        <div className="comments mt-5">
            <h3 className="comments title">Comments</h3>
            <CommentForm postId={postId}/>
            <div className="comments-list">
                {comments.map((comment)=>(
                    <Comment key={comment._id} comment = {comment} />
                ))}
            </div>
        </div>
    );
}
