import React, { useContext, useEffect, useState } from "react";
import { isLoggedIn, UserContext } from "../context/User";
import { Link, Navigate } from "react-router-dom";
import Banner from "./Utils/Banner";
<<<<<<< HEAD
import { getAllDiscussions } from "../api/discussion";
import Tag from "./Utils/Tag";
=======
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Card, CircularProgress, Grid, Popover} from "@mui/material";
import PostCard from "./Posts/PostCard";
import PostForm from "./Form/PostForm";
import {getPosts} from "../actions/posts";
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f

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

<<<<<<< HEAD
    // This is just a template
    let responds = [
        {
            id: '12u',
            title: "OA",
            tag: ['Meta', 'OA', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'Meta', 'OA', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'Meta', 'OA', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'Meta', 'OA', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'wby',
                avatar: null
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `a variant of
            'leetcode 123'
            `,
            comment: [
                {
                    commentId: '13987',
                    user: {
                        username: 'wby'
                    },
                    body: `WOW!`
                },
                {
                    commentId: 'a123',
                    user: {},
                    body: `WOW!`
                },
            ]
        },
        {
            id: '1asdf2u',
            title: "Interview",
            tag: ['Google', 'VO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'By David',
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `TOO HARD!`,
            comment: [
                {
                    commentId: '13987',
                    user: {},
                    body: `WOW!`
                },
            ]
        }, {
            id: '1asdf2u',
            title: "Interview",
            tag: ['Google', 'VO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'By David',
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `TOO HARD!`,
            comment: [
                {
                    commentId: '13987',
                    user: {},
                    body: `WOW!`
                },
            ]
        }, {
            id: '1asdf2u',
            title: "Interview",
            tag: ['Google', 'VO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'By David',
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `TOO HARD!`,
            comment: [
                {
                    commentId: '13987',
                    user: {},
                    body: `WOW!`
                },
            ]
        }, {
            id: '1asdf2u',
            title: "Interview",
            tag: ['Google', 'VO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'By David',
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `TOO HARD!`,
            comment: [
                {
                    commentId: '13987',
                    user: {},
                    body: `WOW!`
                },
            ]
        }, {
            id: '1asdf2u',
            title: "Interview",
            tag: ['Google', 'VO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'By David',
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `TOO HARD!`,
            comment: [
                {
                    commentId: '13987',
                    user: {},
                    body: `WOW!`
                },
            ]
        }
    ];
    // TODO: Extract a Post Card class (Similar to Post.jsx).
    const posts = responds.map((res, idx) => {
        return <li className="list-group-item list-group-item-action" key={idx}>
            <Link to={`./${res.id}`}
                // state need to be removed
                state={res}
                className='text-dark text-decoration-none d-flex flex-column'>
                <div className="d-flex flex-row align-items-center my-2 justify-content-start">
                    <img className="avatar-tiny me-3" width={30}
                        title={`${res.user.username}`}
                        src={(res.user.avatar !== '' && res.user.avatar) || `https://ui-avatars.com/api/?name=${res.user.username}&background=random&bold=true&rounded=true`} alt={`user ${res.user.username}`} />
                    <strong>{res.title}</strong>
                    <div className='text-muted ms-auto'>last updated {`${res.updatedTime.toLocaleTimeString().slice(0, -3)}  ${res.updatedTime.toLocaleDateString()}`}</div>
                </div>
                <Tag tag={res.tag} />
                <div className="my-3">{res.body.slice(0, 80)}</div>
            </Link>
        </li>
    })
=======
    const handleClose = () => {
        setAnchorEl(null);
    };
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

<<<<<<< HEAD
    return <div className="h-100"
        style={
            {
                overflowY: 'scroll'
            }
        }
    >
        <Banner className='h-50' pageName={'discussion'} />
        <div className="container py-3 py-lg-5 container--narrow">
            <div>
                <div className="profile-nav nav nav-tabs pt-2 mb-4">
                    <Link to="#" className="profile-nav-link nav-item nav-link active">Posts</Link>
=======
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
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
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
