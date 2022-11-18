import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import * as React from "react";


export function Comment({ comment }) {
    const avatarSrc = `https://ui-avatars.com/api/?name=${comment.creatorName}&background=random&bold=true`;
    return(
        <Card className="mb-4">
            <CardHeader
                avatar={
                    <Avatar src={avatarSrc} />
                }
                title={comment.creatorName}
                subheader={comment.createdAt}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {comment.message}
                </Typography>
            </CardContent>
            <CardActions >
                <IconButton aria-label="add to favorites">
                    <ThumbUpOffAltOutlinedIcon sx={{color:'pink'}}/>
                </IconButton>
                <span> {comment.likeCount} Likes </span>

            </CardActions>
        </Card>
    );
}
