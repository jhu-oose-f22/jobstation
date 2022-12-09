import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {isLoggedIn, UserContext} from "../../../context/User";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {API_URL} from "../../../context/Const";


export function Comment({ comment,postId }) {

    const {user} = useContext(UserContext);
    const avatarSrc = `https://ui-avatars.com/api/?name=${comment.creatorName}&background=random&bold=true`;
    const [liked,setLiked] = useState(false);
    const [isUser,setIsUser] = useState(true);
    const [oneComment,setComment] = useState(comment);

    useEffect(()=>{
        if(!isLoggedIn(user)){
            return;
        }
        if(user._id === oneComment.creator){
            setIsUser(true);
        }
        else{
            setIsUser(false);
        }

        console.log(oneComment.likedPeople);
        for(let i=0;i<oneComment.likeCount;i++){
            if(oneComment.likedPeople[i]===user._id){
                setLiked(true);
                break;
            }
        }
    },[oneComment])

    const handleLike = async () => {
        if(liked){
            // router.patch('/discuss/comment/like/:id', likeComment);
            await fetch(`${API_URL}/discuss/comment/dislike/${comment._id}/user/${user._id}`,{
                method: "PATCH",
            }).
            then((res) => res.json());
            setComment(preComment =>{
                return {...preComment, likeCount: preComment.likeCount-1}
            })
            setLiked(false);
        }
        else{
            await fetch(`${API_URL}/discuss/comment/like/${comment._id}/user/${user._id}`,{
                method: "PATCH",
            }).
            then((res) => res.json());
            setComment(preComment =>{
                return {...preComment, likeCount: preComment.likeCount+1}
            })
            setLiked(true);
        }
    }

    const handleDelete = async () => {
        //router.delete('/discuss/post/:postId/comment/:commentId', deleteComment);
        await fetch(`${API_URL}/discuss/post/${postId}/comment/${oneComment._id}`,{
            method: "DELETE",
        }).then((res) => console.log(res));
        window.history.go(0);
    }
    return(
        <Card className="mb-4">
            <CardHeader
                avatar={
                    <Avatar src={avatarSrc} />
                }
                title={oneComment.creatorName}
                subheader={oneComment.createdAt?.slice(0,16)}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {oneComment.message}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    {
                        liked ?
                            <ThumbUpRoundedIcon sx={{color:'pink'}}/>
                            :
                            <ThumbUpOffAltOutlinedIcon sx={{color:'pink'}}/>
                    }
                </IconButton>
                <span> {oneComment.likeCount} Likes </span>
                <IconButton aria-label="add to favorites" onClick={handleDelete}>
                {
                    isUser ?
                        <DeleteForeverOutlinedIcon sx={{color:'#198754'}}></DeleteForeverOutlinedIcon>
                        :
                        <></>
                }
                </IconButton>
            </CardActions>
        </Card>
    );
}
