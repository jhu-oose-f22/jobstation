import React, {useContext, useEffect, useState} from "react";
import {isLoggedIn, UserContext} from "../context/User";
import {Navigate, useNavigate} from "react-router-dom";
import Banner from "./Utils/Banner";
import {Grid, switchClasses} from "@mui/material";
import PostCard from "./Posts/PostCard";


export default function Discussion(props) {
    const {user} = useContext(UserContext);

    const navigate = useNavigate();
    const [isRecommend, setIsRecommend] = useState(true);

    const [allPosts, setAllPosts] = useState([]);
    const [recPosts, setRecPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const newPage = `/discussion/search-result/${searchInput}`;


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
    const handleSearch = (e) => {
        navigate(newPage);
    };

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

    const handleSort = (e) => {
        let sortedAllPost = [];
        let sortedRecPost = [];
        switch (e) {
            case 'hot':
                sortedAllPost = [...allPosts].sort((a,b) => b.commentCount - a.commentCount);
                sortedRecPost = [...recPosts].sort((a,b) => b.commentCount - a.commentCount);
                setAllPosts(sortedAllPost);
                setRecPosts(sortedRecPost);
                return;
            case 'new to old':
                sortedAllPost = [...allPosts].sort((a,b) => b.createdAt > a.createdAt? 1 : -1);
                sortedRecPost = [...recPosts].sort((a,b) => b.createdAt > a.createdAt ? 1 : -1);
                setAllPosts(sortedAllPost);
                setRecPosts(sortedRecPost);
                return;
            case 'like':
                sortedAllPost = [...allPosts].sort((a,b) => b.likeCount - a.likeCount);
                sortedRecPost = [...recPosts].sort((a,b) => b.likeCount - a.likeCount);
                setAllPosts(sortedAllPost);
                setRecPosts(sortedRecPost);
                return;
        }
    }

    return (
        isRecommend ?(
        <div className="vh-100">
            <Banner className='h-50' pageName={'discussion'}/>
            <div className="container py-3 py-lg-5">
                <nav className="nav nav-tabs mb-2 d-flex justify-content-start">
                    <button className="nav-link active" onClick={handleLoadRec}>Posts
                    </button>
                    <button className="nav-link" onClick={handleLoadAll}>All Posts
                    </button>
                    <form className="d-flex align-right ms-auto me-2">
                        <input className="form-control me-2" id="post" placeholder="search for posts"
                               aria-label="Search" onChange={(e)=> setSearchInput(e.target.value)}/>
                        <button className="btn btn-outline-success" type="button" onClick={()=>handleSearch()}>GO</button>
                    </form>
                    <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                </nav>
                <div className="mb-2 hstack gap-3">
                    <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('hot')}>Hot</button>
                    <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('new to old')}>Newest to Oldest</button>
                    <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('like')}>Most Votes</button>
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
                    <Banner className='h-50' pageName={'discussion'}/>
                    <div className="container py-3 py-lg-5">
                        <nav className="nav nav-tabs mb-2 d-flex justify-content-start">
                            <button className="nav-link" onClick={handleLoadRec}>Posts
                            </button>
                            <button className="nav-link active" onClick={handleLoadAll}>All Posts
                            </button>
                            <form className="d-flex align-right ms-auto me-2">
                                <input className="form-control me-2" id="post" placeholder="search for posts"
                                       aria-label="Search" onChange={(e)=> setSearchInput(e.target.value)}/>
                                <button className="btn btn-outline-success" type="button" onClick={()=>handleSearch()}>GO</button>
                            </form>
                            <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                        </nav>
                        <div className="mb-2 hstack gap-3">
                            <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('hot')}>Hot</button>
                            <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('new to old')}>Newest to Oldest</button>
                            <button type="button" className="btn btn-none btn-sm" onClick={()=>handleSort('like')}>Most Votes</button>
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
