import React, { useContext, useEffect, useState } from "react";
import { isLoggedIn, UserContext } from "../context/User";
import { Link, Navigate } from "react-router-dom";
import Banner from "./Utils/Banner";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Card, CircularProgress, Grid, Popover} from "@mui/material";
import PostCard from "./Posts/PostCard";
import PostForm from "./Form/PostForm";
import {getPosts, getPostsRecommended} from "../actions/posts";
import axios from "axios";

export default function Discussion() {
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])

    const [anchorEl, setAnchorEl] = useState(null);
    const [isRecommend,setIsRecommend] = useState(false);
    const discussionPosts = useSelector((state)=> state.posts);
    const [recommendedPosts,setRecommendedPosts] = useState([]);

    useEffect(() => {
        if (!isLoggedIn(user)) return;

        // fetch(`/discuss/user/zpu2`)
        fetch(`/discuss/user/${user.username}`)
            .then((res) => res.json())
            .then((fetched) => {
                setRecommendedPosts(fetched);
            });
    }, [isRecommend]);

    if (!isLoggedIn(user)) {
        return <Navigate to='/login' />;
    }

    const handleLoadRec = () => {
        setIsRecommend(true);
        console.log("get the recommend posts for user");

    };

    const handleLoadAll = () => {
        setIsRecommend(false);
        console.log("get posts for user");

    };

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
                !isRecommend ?
                <div className="vh-100">
                    <Banner className='h-50' pageName={'discussion'} />
                    <div className="container py-3 py-lg-5 container--narrow">
                        <div>
                            <div className="profile-nav nav nav-tabs pt-2 mb-4">
                                <Link to="/discussion" className="profile-nav-link nav-item nav-link active">Posts</Link>
                                <Link to="/discussion" className="profile-nav-link nav-item nav-link active" onClick={handleLoadRec}>Posts for You</Link>

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
                    :
                    (
                        <div className="vh-100">
                            <Banner className='h-50' pageName={'discussion'} />
                            <div className="container py-3 py-lg-5 container--narrow">
                                <div>
                                    <div className="profile-nav nav nav-tabs pt-2 mb-4">
                                        <Link to="/discussion" className="profile-nav-link nav-item nav-link active" onClick={handleLoadAll}>Posts</Link>
                                        <Link to="/discussion" className="profile-nav-link nav-item nav-link active" onClick={handleLoadRec}>Posts for You</Link>

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
                                            recommendedPosts.map((post) =>(
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
            )
    );
}
