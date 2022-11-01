import React from "react";
import {useSelector} from "react-redux";

import Post from './Post/Post';
import PostForm from '../Form/PostForm'
import {Container} from "@mui/material";

const Posts = () => {
    const posts = useSelector((state)=> state.posts);
    console.log(posts);
    return(
        <Container maxWidth='lg'>
            <h1>hello posts</h1>
            <Post/>
            <PostForm/>
        </Container>
    );
}

export default Posts;
