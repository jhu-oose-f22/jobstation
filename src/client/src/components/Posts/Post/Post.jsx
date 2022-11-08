import {useParams, useLocation, useNavigate} from "react-router-dom";
import {Button, Link, Popover, Stack, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {isLoggedIn, UserContext} from "../../../context/User";
import Avatar from "@mui/material/Avatar";

export default function Post(props) {
    const {user} = useContext(UserContext);
    const { postId } = useParams();
    const [post, setPost] = useState("");
    const [isUser,setIsUser] = useState(false);
    const navigate = useNavigate();
    console.log(postId)

    useEffect(()=>{
        fetch(`/discuss/post/${postId}`)
            .then((res) => res.json())
            .then((fetched) => {
                setPost(fetched);
            });
    },[])

    const avatarSrc = `https://ui-avatars.com/api/?name=${post.creator}&background=random&bold=true`;
    let postTags = post.tags;
    if(postTags===undefined){
        postTags=[];
    }

    useEffect(()=>{
        if(!isLoggedIn(user)){
            return;
        }
        if(user._id === post.creator){
            setIsUser(true);
        }
        else{
            setIsUser(false);
        }
    },[isUser])

    const handleEdit = (event) => {
        navigate('/discussion/edit')
    };

    const handleDelete = () => {
        alert('delete the post');
    };

    return (

        <div className="container py-lg-5 py-3 container-lg vh-100">
            <div className='d-flex justify-content-between align-items-baseline'>
                <h1>{post.title}</h1>

                {
                    isUser?
                    <div className='d-flex flex-row align-content-center justify-content-center'>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Stack>
                    </div>
                        :
                        (
                            <></>
                        )
                }
            </div>
            <Avatar src={avatarSrc} />
            <div className="text-muted small mb-4">
                <div className="d-flex flex-row align-items-center my-2 justify-content-start">
                    {/*<img className="avatar-tiny me-3" width={30}*/}
                    {/*    title={`${onePost.creator}`}*/}
                    {/*    src={(state.user.avatar !== '' && state.user.avatar) || `https://ui-avatars.com/api/?name=${state.user.username}&background=random&bold=true&rounded=true`} alt={`user ${state.user.username}`} />*/}
                    <strong>{post.creator}</strong>
                    <div className='text-muted ms-auto'>last updated {`${post.createdAt}`}</div>
                </div>
            </div>
            <div>
                tags:<strong className="text-muted">{postTags.map((tag) => {
                    const newPage = `/discussion/search-result/${tag}`;
                return <Link href={newPage} className="btn btn-outline-secondary btn-sm mx-1" underline="none">
                    {tag}
                </Link>
            })}
            </strong>
            </div>
            <hr />
            <div className=' body-content'>
                {post.message}
            </div>

        </div>
    );
}
