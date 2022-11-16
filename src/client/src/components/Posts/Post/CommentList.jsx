import { Comment } from "./Comment"
import {useState} from "react";

export function CommentList({ postId }) {

    const [comments,setComments] = useState([]);
    // useEffect

    return comments.map(comment => (

        <div key={comment.id} className="comment-stack mt-3">
            <Comment {...comment} />
        </div>


    ))
}
