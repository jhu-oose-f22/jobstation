import React, {useContext, useEffect, useState} from "react";
import {isLoggedIn, UserContext} from "../../context/User";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Banner from "../Utils/Banner";
import {Grid} from "@mui/material";
import PostCard from "./PostCard";

const PostSearchResult = (props) => {

    const {user} = useContext(UserContext);
    const { searchInput } = useParams();
    const [posts, setPosts] = useState([]);
    const [searchNewInput, setSearchNewInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        // e.preventDefault();
        const newPage = `/discussion/search-result/${searchNewInput}`;
        navigate(newPage);
        window.history.go(0);
    };
    console.log(searchInput);
    useEffect(()=>{
        fetch(`/discuss/search/${searchInput}`)
            .then((res) => res.json())
            .then((fetched) => {
                setPosts(fetched);
            });
    },[])
    console.log(posts);
    if (!isLoggedIn(user)) {
        return <Navigate to='/login'/>;
    }
    const handleSort = (e) => {
        let sortedSearchPost = [];

        switch (e) {
            case 'hot':
                sortedSearchPost = [...posts].sort((a,b) => b.commentCount - a.commentCount);
                setPosts(sortedSearchPost);
                return;
            case 'new to old':
                sortedSearchPost = [...posts].sort((a,b) => b.createdAt > a.createdAt? 1 : -1);
                setPosts(sortedSearchPost);
                return;
            case 'like':
                sortedSearchPost = [...posts].sort((a,b) => b.likeCount - a.likeCount);
                setPosts(sortedSearchPost);
                return;
        }
    }

    const handleCreate = (event) => {
        navigate('/discussion/create')
    };
    return(
        <div className="vh-100">
            <Banner className='h-50' pageName={'discussion'}/>
            <div className="container py-3 py-lg-5">
                <nav className="nav nav-tabs mb-2 d-flex justify-content-start">
                    <button className="nav-link active">Search Results
                    </button>
                    <form className="d-flex align-right ms-auto me-2">
                        <input className="form-control me-2" id="post" placeholder="search for posts"
                               aria-label="Search" onChange={(e)=> setSearchNewInput(e.target.value)}/>
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
                        posts.map((post) => (
                            <Grid key={post.id} item xs={12} sm={12} lg={12}>
                                <PostCard post={post}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    );


}

export default PostSearchResult;
