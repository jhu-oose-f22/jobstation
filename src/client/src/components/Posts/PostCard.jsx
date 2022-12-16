import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import {Snackbar} from "@mui/material";
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RecipeReviewCard({post}) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const avatarSrc = `https://ui-avatars.com/api/?name=${post.creatorName}&background=random&bold=true`;
    const newPage = `/discussion/post/${post._id}`;
    const shareLink = `https://jobstation.netlify.app/discussion/post/${post._id}`;
    const handleOnePost = () => {
        navigate(newPage);
        window.history.go(0);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleShare = () => {
        navigator.clipboard.writeText(shareLink);
        setOpen(true);
    }
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={avatarSrc} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.title}
                subheader={post.createdAt?.slice(0,16)}
                onClick={handleOnePost}

            />
            <CardContent  onClick={handleOnePost}>
                <Typography variant="body2" color="text.secondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="add to favorites">
                    <ThumbUpOffAltOutlinedIcon sx={{color:'pink'}}/>
                </IconButton>
                <span> {post.likeCount} Likes </span>
                <IconButton aria-label="add to favorites">
                    <MarkUnreadChatAltOutlinedIcon />
                </IconButton>
                <span> {post.commentCount} Comments </span>
                <IconButton aria-label="share">
                    <ShareIcon sx={{color:"#39a5c0"}} onClick={handleShare} />
                </IconButton>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Link has been copied in the clipboard!
                    </Alert>
                </Snackbar>
            </CardActions>
        </Card>
    );
}
