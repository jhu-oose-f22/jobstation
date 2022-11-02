import {Button, Card, CardActions, CardContent, CardMedia, Link, Typography} from "@mui/material";


const PostCard = ({post}) => {

    const postPage = `/discussion/post/${post._id}`;
    const displayMessage = `${post.message.substring(0,50)}...`
    return(
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                {/*    {post.creator}*/}
                {/*</Typography>*/}

                <Typography variant="h6" component="div" marginBottom={2}>
                    {post.title} <span>{post.creator}</span>
                </Typography>
                <div>
                    tags:<strong className="text-muted">{post.tags.map((tag) => {
                    return <Link href='/' className="btn btn-outline-secondary btn-sm mx-1" underline="none">
                        {tag}
                    </Link>
                })}
                </strong>
                </div>
                <Typography variant="body2" marginTop={2}>
                    {displayMessage}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={postPage} underline="none">
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default PostCard;
