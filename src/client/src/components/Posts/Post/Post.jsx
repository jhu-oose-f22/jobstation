import { useParams, useLocation } from "react-router-dom";
import {Button, Link, Popover, Stack, Typography} from "@mui/material";
import PostForm from "../../Form/PostForm";
import React, {useContext, useEffect, useState} from "react";
import {isLoggedIn, UserContext} from "../../../context/User";

export default function Post(props) {
    const {user} = useContext(UserContext);
    const { postId } = useParams();


    const [post, setPost] = useState("");
    const [isUser,setIsUser] = useState(false);

    console.log(postId)

    useEffect(()=>{
        fetch(`/discuss/post/${postId}`)
            .then((res) => res.json())
            .then((fetched) => {
                setPost(fetched);
            });
    },[])

    let postTags = post.tags;
    if(postTags===undefined){
        postTags=[];
    }

    useEffect(()=>{
        if(!isLoggedIn(user)){
            return;
        }
        if(user._id === post.creator){
            setIsUser(true);
        }
        else{
            setIsUser(false);
        }
    },[isUser])

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        alert('delete the post');
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        isUser?
        <div className="container py-lg-5 py-3 container-lg vh-100">
            <div className='d-flex justify-content-between align-items-baseline'>
                <h1>{post.title}</h1>
                <div className='d-flex flex-row align-content-center justify-content-center'>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleClick}>
                            Edit
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorReference="anchorPosition"
                            onClose={handleClose}
                            anchorPosition={{ top: 200, left: 400 }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <PostForm formType='edit'/>
                        </Popover>
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Stack>
                </div>

            </div>

            <div className="text-muted small mb-4">
                <div className="d-flex flex-row align-items-center my-2 justify-content-start">
                    {/*<img className="avatar-tiny me-3" width={30}*/}
                    {/*    title={`${onePost.creator}`}*/}
                    {/*    src={(state.user.avatar !== '' && state.user.avatar) || `https://ui-avatars.com/api/?name=${state.user.username}&background=random&bold=true&rounded=true`} alt={`user ${state.user.username}`} />*/}
                    <strong>{post.creator}</strong>
                    <div className='text-muted ms-auto'>last updated {`${post.createdAt}`}</div>
                </div>
            </div>

            <hr />
            <div className=' body-content'>
                {post.message}
            </div>

        </div>
            :
            (
                <div className="container py-lg-5 py-3 container-lg vh-100">
                    <div className='d-flex justify-content-between align-items-baseline'>
                        <h1>{post.title}</h1>

                    </div>

                    <div className="text-muted small mb-4">
                        <div className="d-flex flex-row align-items-center my-2 justify-content-start">
                            {/*<img className="avatar-tiny me-3" width={30}*/}
                            {/*    title={`${onePost.creator}`}*/}
                            {/*    src={(state.user.avatar !== '' && state.user.avatar) || `https://ui-avatars.com/api/?name=${state.user.username}&background=random&bold=true&rounded=true`} alt={`user ${state.user.username}`} />*/}
                            <strong>{post.creator}</strong>
                            <div className='text-muted ms-auto'>last updated {`${post.createdAt}`}</div>
                        </div>
                    </div>
                    <div>
                        tags:<strong className="text-muted">{postTags.map((tag) => {
                        return <Link href='/' className="btn btn-outline-secondary btn-sm mx-1" underline="none">
                            {tag}
                        </Link>
                    })}
                    </strong>
                    </div>
                    <hr />
                    <div className=' body-content'>
                        {post.message}
                    </div>
                </div>
            )
    );
}
