import React, {useContext, useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import FileBase from 'react-file-base64';
import {useDispatch} from "react-redux";
import {createPost} from "../../actions/posts";
import {useNavigate} from "react-router-dom";
import {isLoggedIn, UserContext} from "../../context/User";

const PostFormEdit = ({formType}) => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const creator = user._id;
    const [postData,setPostData] = useState({creator:creator,title:'',tags:'',message:'',selectFile:''})
    const dispatch = useDispatch();

    if (!isLoggedIn(user)) return;
    const handleSubmit = (e) =>{

        e.preventDefault();
        dispatch(createPost(postData));

        navigate('/discussion');

    }

    return (
        <Paper className="container-lg mt-5">
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{formType==='edit' ? `Editing"` : 'Editing'}</Typography>
                {/*<TextField name="creator" variant="standard" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />*/}
                <TextField name="title" variant="standard" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="standard" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="standard" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            </form>
        </Paper>
    );
}

export default PostFormEdit
