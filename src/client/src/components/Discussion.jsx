import React, { useContext, useEffect, useState } from "react";
import { isLoggedIn, UserContext } from "../context/User";
import { Link, Navigate } from "react-router-dom";
import Banner from "./Utils/Banner";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Card, CircularProgress, Grid, Popover} from "@mui/material";
import PostCard from "./Posts/PostCard";
import PostForm from "./Form/PostForm";
import {getPosts} from "../actions/posts";

export default function Discussion() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])
    const [anchorEl, setAnchorEl] = useState(null);
    const discussionPosts = useSelector((state)=> state.posts);
    console.log(discussionPosts)
    const { user } = useContext(UserContext);

    if (!isLoggedIn(user)) {
        return <Navigate to='/login' />;
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        !discussionPosts.length ?
            <div className="vh-100">
                <Banner className='h-50' pageName={'discussion'} />
                <div className="container py-3 py-lg-5 container--narrow">
                    <div>
                        <div className="profile-nav nav nav-tabs pt-2 mb-4">
                            <Link to="/discussion" className="profile-nav-link nav-item nav-link active">Posts</Link>
                            <Link to="/todo" className="profile-nav-link nav-item nav-link active">Interview Question</Link>
                            <Link to="/todo" className="profile-nav-link nav-item nav-link active">Offer Compare</Link>
                            <Button variant="contained" onClick={handleClick}>
                                Create a Post
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
                                <PostForm/>
                            </Popover>
                        </div>
                        <ul className="list-group">
                            <CircularProgress/>
                        </ul>
                    </div>
                </div>
            </div>
            : (
                <div className="vh-100">
                    <Banner className='h-50' pageName={'discussion'} />
                    <div className="container py-3 py-lg-5 container--narrow">
                        <div>
                            <div className="profile-nav nav nav-tabs pt-2 mb-4">
                                <Link to="/discussion" className="profile-nav-link nav-item nav-link active">Posts</Link>
                                <Link to="/discussion/recommend" className="profile-nav-link nav-item nav-link active">Posts for You</Link>

                                <Button variant="contained" onClick={handleClick}>
                                    Create
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
                                    <PostForm/>
                                </Popover>
                            </div>

                            <Grid container rowSpacing={2}>
                                {
                                    discussionPosts.map((post) =>(
                                        <Grid key={post.id} item xs={12} sm={12} lg={12}>
                                            <PostCard post={post}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                    </div>
                </div>
            )
    );
}
