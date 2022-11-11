// import { useState, useEffect, useContext } from "react";
// import { isLoggedIn, UserContext } from "../context/User";
// import Banner from "./Utils/Banner";
// import React, { useContext, useEffect, useState } from "react";
// import { isLoggedIn, UserContext } from "../context/User";
// import { Navigate, useNavigate } from "react-router-dom";
// import Banner from "./Utils/Banner";
// import { useDispatch } from "react-redux";
import { Grid, Popover } from "@mui/material";
import PostCard from "../Posts/PostCard";
// import PostForm from "./Form/PostForm";
// import { getPosts } from "../actions/posts";
import ScrollToTop from "react-scroll-to-top";

export default function Dashboard({ posts }) {
    // const {user} = useContext(UserContext);
    
    return (
        <div className="vh-100">
            <ScrollToTop
                smooth
                component={<p style={{ color: "blue" }}>UP</p>}
            />
            {/* <Banner className="h-50" pageName={"discussion"} /> */}
            <div className="container py-3 py-lg-5">
            <h2>Posts</h2>
                
                
                <Grid container rowSpacing={2}>
                    {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} lg={12}>
                            <PostCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}
