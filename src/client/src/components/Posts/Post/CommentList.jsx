import { Comment } from "./Comment"
import React, {useEffect, useState} from "react";
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

    const handleSort = (e) => {
        let sortedComment = [];

        switch (e) {
            case 'new to old':
                sortedComment = [...comments].sort((a,b) => b.createdAt > a.createdAt? 1 : -1);
                setComments(sortedComment);
                return;
            case 'like':
                sortedComment = [...comments].sort((a,b) => b.likeCount - a.likeCount);
                setComments(sortedComment);
                return;
        }
    }

    return(

        <div className="comments mt-5">
            <h3 className="comments title">Comments</h3>
            <CommentForm postId={postId}/>

            <div className="mb-2 hstack gap-3">
                <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('new to old')}>Newest to Oldest</button>
                <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('like')}>Most Likes</button>
            </div>
            <div className="comments-list">
                {comments.map((comment)=>(
                    <Comment key={comment._id} comment = {comment} postId={postId} />
                ))}
            </div>
        </div>
    );
}
