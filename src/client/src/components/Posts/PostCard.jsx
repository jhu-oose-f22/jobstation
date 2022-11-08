// import {Button, Card, CardActions, CardContent, CardMedia, Link, Typography} from "@mui/material";
//
//
// const PostCard = ({post}) => {
//
//     const postPage = `/discussion/post/${post._id}`;
//     const displayMessage = `${post.message.substring(0,50)}...`
//     return(
//         <Card sx={{ minWidth: 275 }}>
//             <CardContent>
//                 <Typography variant="h6" component="div" marginBottom={2}>
//                     {post.title} <span>{post.creator}</span>
//                 </Typography>
//                 <div>
//                     tags:<strong className="text-muted">{post.tags.map((tag) => {
//                     return <Link href='/' className="btn btn-outline-secondary btn-sm mx-1" underline="none">
//                         {tag}
//                     </Link>
//                 })}
//                 </strong>
//                 </div>
//                 <Typography variant="body2" marginTop={2}>
//                     {displayMessage}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Link href={postPage} underline="none">
//                     <Button size="small">Learn More</Button>
//                 </Link>
//             </CardActions>
//         </Card>
//     );
// }
//
// export default PostCard;
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import {Snackbar} from "@mui/material";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RecipeReviewCard({post}) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const avatarSrc = `https://ui-avatars.com/api/?name=${post.creator}&background=random&bold=true`;
    const newPage = `/discussion/post/${post._id}`;
    const shareLink = `localhost:3000/discussion/post/${post._id}`;
    const handleOnePost = () => {
        navigate(newPage);
        window.history.go(0);
    };
    const handleLike = () => {
        alert("todo, increment like by one");
    }
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
                subheader={post.createdAt}
                onClick={handleOnePost}

            />
            <CardContent  onClick={handleOnePost}>
                <Typography variant="body2" color="text.secondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{color:'pink'}} onClick={handleLike}/>
                </IconButton>
                <span> {post.likeCount} Likes </span>
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
