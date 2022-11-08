import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/User";
import {useNavigate, useParams} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
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


    const handleCreate = (event) => {
        navigate('/discussion/create')
    };
    return(
        <div className="vh-100">
            <ScrollToTop smooth component={<p style={{color: "blue"}}>UP</p>}/>
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
                    <button type="button" className="btn btn-none btn-sm">Hot</button>
                    <button type="button" className="btn btn-none btn-sm">Newest to Oldest</button>
                    <button type="button" className="btn btn-none btn-sm">Most Votes</button>
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
