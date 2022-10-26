import React from "react";
import {useState} from "react";
import {TextField, Button, Typography, Box } from "@mui/material";
import FileBase from "react-file-base64";

const PostForm = () => {
    const [postData,setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });

    const handleSubmit = ()=>{
    }

    const clear = () =>{

    }
    return(
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <div>
            <Typography variant='h6'> Creating a Post </Typography>

            <TextField name="creator" variant="outlined" label = "Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData,creator:e.target.value})}/>
            <TextField name="title" variant="outlined" label = "Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
            <TextField name="message" variant="outlined" label = "Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>
            <TextField name="tags" variant="outlined" label = "Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value})}/>
            <div>
                <FileBase type="file" multiple = {false} onDone={({base64})=> setPostData({...postData,selectedFile: base64})}/>
            </div>
            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </div>

        </Box>
    );
}

export default PostForm;
