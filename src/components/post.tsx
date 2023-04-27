import { PostModel } from "@/models/PostModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LinkIcon from "@mui/icons-material/Link";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import useWindowHeight from "@/hooks/window-height";
import { useRouter } from "next/router";
import { useIsSmall } from "@/hooks/media-queries";

const getImageHeight = (matches700: boolean, matches800: boolean) => {
  if (matches800) {
    return 540;
  } else if (matches700) {
    return 440;
  }
  return 350;
};

const getCardHeight = (isMobile: boolean, height: number) => {
  return isMobile ? 721 : Math.min(height - 56, 850);
};

const getMarginBottom = (isMobile: boolean, height: number) => {
  return isMobile ? (height - 721) / 8 : 8;
};

function Post(props: { post: PostModel }) {
  const height = useWindowHeight();

  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 200) + 100);
  }, []);

  const router = useRouter();
  const routeToDetailedView = () => {
    router.push(`/idea/${props.post.post_id}`);
  };
  const routeToLineage = () => {
    router.push(`/idea/${props.post.post_id}/lineage`);
  };
  const linkIdea = () => {
    router.push({
      pathname: "/add-idea",
      query: { idea: props.post.title },
    });
  };
  const matches800 = useMediaQuery("(min-height: 800px)");
  const matches700 = useMediaQuery("(min-height: 700px)");
  const isMobile = useIsSmall();

  const postStyle = () => {
    return isMobile
      ? {
          height: getCardHeight(!isMobile, height),
          scrollSnapAlign: "start",
          marginBottom: getMarginBottom(!isMobile, height),
        }
      : { marginBottom: 5 };
  };

  return (
    <Card sx={postStyle}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            I
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={props.post.title}
        subheader={`@${props.post.author_id}`}
      />
      <CardMedia
        sx={{ maxHeight: getImageHeight(matches700, matches800) }}
        component="img"
        image={props.post.media_links}
        onClick={routeToDetailedView}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.description + " " + props.post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="link" onClick={linkIdea}>
          <LinkIcon />
        </IconButton>
        <IconButton aria-label="tree" onClick={routeToLineage}>
          <AccountTreeIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
