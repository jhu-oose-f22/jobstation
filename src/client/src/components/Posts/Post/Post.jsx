import { useParams, useLocation } from "react-router-dom";
import {Button, Link, Popover, Stack, Typography} from "@mui/material";
import PostForm from "../../Form/PostForm";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostById} from "../../../actions/posts";

export default function Post(props) {
    const {state} = useLocation();
    const { postId } = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPostById(postId));
    },[dispatch])
    const testPost = useSelector((state)=> state.posts);
    
    
    
    
    console.log(testPost);

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
        <div className="container py-lg-5 py-3 container-lg vh-100">
            <div className='d-flex justify-content-between align-items-baseline'>
                <h1>{testPost.title}</h1>
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
                    <strong>{testPost.creator}</strong>
                    <div className='text-muted ms-auto'>last updated {`${testPost.createdAt}`}</div>
                </div>
                {/*<div>*/}
                {/*    <Typography variant="body2" color="textSecondary" component="h2">{onePost?.tags.map((tag) => `#${tag} `)}</Typography>*/}
                {/*</div>*/}
            </div>

            <div className=' body-content'>
                {testPost.message}
            </div>

            <hr />
        </div>
    );
}
