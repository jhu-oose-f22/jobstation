import React, {useContext, useEffect, useState} from "react";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {isLoggedIn, UserContext} from "../../context/User";
import axios from "axios";
import {API_URL} from "../../context/Const";

const PostFormEdit = ({formType}) => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const { postId } = useParams();
    const creator = user._id;
    const [postData,setPostData] = useState({creator:creator,title:'',tags:'',message:'',selectFile:''})

    useEffect(()=>{
        fetch(`${API_URL}/discuss/post/${postId}`)
            .then((res) => res.json())
            .then((fetched) => {
                setPostData(fetched);
            });
    },[])


    const dispatch = useDispatch();

    if (!isLoggedIn(user)) return;
    const handleSubmit = (e) =>{

        e.preventDefault();
        axios.patch(`${API_URL}/discuss/update/${postId}`,postData).then((res) => console.log(res) ,(err)=>{
            console.log(err);
        })

        navigate(`/discussion/post/${postId}`);

    }

    return (
        <Paper className="container-lg mt-5">
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{formType==='edit' ? `Editing"` : 'Editing'}</Typography>
                {/*<TextField name="creator" variant="standard" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />*/}
                <TextField name="title" variant="standard" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="standard" label="Message" fullWidth multiline rows={15} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="standard" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                {/*<div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>*/}
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth className="mt-3 mb-2">Submit</Button>
            </form>
        </Paper>
    );
}

export default PostFormEdit
