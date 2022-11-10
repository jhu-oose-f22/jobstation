import React, {useContext, useEffect, useState} from "react";
import {isLoggedIn, UserContext} from "../context/User";
import {Navigate, useNavigate} from "react-router-dom";
import Banner from "./Utils/Banner";
import {useDispatch} from "react-redux";
import {Grid, Popover} from "@mui/material";
import PostCard from "./Posts/PostCard";
import PostForm from "./Form/PostForm";
import {getPosts} from "../actions/posts";
import ScrollToTop from "react-scroll-to-top";


export default function Discussion(props) {
    const {user} = useContext(UserContext);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    const navigate = useNavigate();
    const [isRecommend, setIsRecommend] = useState(true);

    const [allPosts, setAllPosts] = useState([]);
    const [recPosts, setRecPosts] = useState([]);
    useEffect(() => {
        if (!isLoggedIn(user)) return;
        if (isRecommend) {
            fetch(`/discuss/user/${user.username}`)
                .then((res) => res.json())
                .then((fetched) => {
                    setRecPosts(fetched);
                });
        } else {
            fetch(`/discuss`)
                .then((res) => res.json())
                .then((fetched) => {
                    setAllPosts(fetched);
                });
        }
    }, [isRecommend]);

    if (!isLoggedIn(user)) {
        return <Navigate to='/login'/>;
    }

    const handleLoadRec = () => {
        setIsRecommend(true);
        //console.log("get the recommend posts for user");

    };

    const handleLoadAll = () => {
        setIsRecommend(false);
        //console.log("get posts for user");

    };

    const handleCreate = (event) => {
        navigate('/discussion/create')
    };

    return (
        isRecommend ?(
        <div className="vh-100">
            <ScrollToTop smooth component={<p style={{color: "blue"}}>UP</p>}/>
            <Banner className='h-50' pageName={'discussion'}/>
            <div className="container py-3 py-lg-5">
                <nav className="nav nav-tabs mb-2 d-flex justify-content-start">
                    <button className="nav-link active" onClick={handleLoadRec}>Posts
                    </button>
                    <button className="nav-link" onClick={handleLoadAll}>All Posts
                    </button>
                    <form className="d-flex align-right ms-auto me-2">
                        <input className="form-control me-2" placeholder="search for posts"
                               aria-label="Search"/>
                        <button className="btn btn-outline-success">GO</button>
                    </form>
                    <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                </nav>
                <div className="mb-2 hstack gap-3">
                    <button type="button" className="btn btn-none btn-sm">Hot</button>
                    <button type="button" className="btn btn-none btn-sm">Newest to Oldest</button>
                    <button type="button" className="btn btn-none btn-sm">Most Votes</button>
                </div>
                <Grid container rowSpacing={2}>
                    {
                        recPosts.map((post) => (
                            <Grid key={post.id} item xs={12} sm={12} lg={12}>
                                <PostCard post={post}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
        )
            :(
                <div className="vh-100">
                    <ScrollToTop smooth component={<p style={{color: "blue"}}>UP</p>}/>
                    <Banner className='h-50' pageName={'discussion'}/>
                    <div className="container py-3 py-lg-5">
                        <nav className="nav nav-tabs mb-2 d-flex justify-content-start">
                            <button className="nav-link" onClick={handleLoadRec}>Posts
                            </button>
                            <button className="nav-link active" onClick={handleLoadAll}>All Posts
                            </button>
                            <form className="d-flex align-right ms-auto me-2">
                                <input className="form-control me-2" placeholder="search for posts"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success">GO</button>
                            </form>
                            <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                        </nav>
                        <div className="mb-2 hstack gap-3">
                            <button type="button" className="btn btn-none btn-sm">Hot</button>
                            <button type="button" className="btn btn-none btn-sm">Newest to Oldest</button>
                            <button type="button" className="btn btn-none btn-sm">Most Votes</button>
                        </div>
                        <Grid container rowSpacing={2}>
                            {
                                allPosts.map((post) => (
                                    <Grid key={post.id} item xs={12} sm={12} lg={12}>
                                        <PostCard post={post}/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                </div>
            )
    );
}
