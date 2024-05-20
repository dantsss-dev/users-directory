import { Button, Container, Fab, Grid, Typography } from "@mui/material";
import { PostCard } from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, selectAllPosts } from "../features/posts/postsSlice";
import { useEffect, useState } from "react";
import {
  fetchUser,
  resetUserStatus,
  selectUserById,
} from "../features/users/usersSlice";
import { UserProfile } from "../components/UserProfile";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { UserProfileSkeleton } from "../components/UserProfileSkeleton";
import { PostCardSkeleton } from "../components/PostCardSkeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CreateNewPostDialogForm } from "../components/CreateNewPostDialogForm";

export const UserPostsPage = () => {
  //Controles para modal
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //Llamadas a la store
  const { userId } = useParams();
  const navigate = useNavigate();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.status);
  const postError = useSelector((state) => state.posts.error);

  const user = useSelector((state) => selectUserById(state, userId));
  const userStatus = useSelector((state) => state.users.status);

  const dispatch = useDispatch();

  //metodos para manipular el modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const GoBack = () => {
    dispatch(resetUserStatus());
    navigate(`/`);
  };

  let content;
  if (postsStatus === "loading") {
    content = <PostCardSkeleton />;
  } else if (postsStatus === "succeeded") {
    if (posts.length <= 0) {
      content = (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          item
          xs={12}
          sm={10}
          md={12}
          lg={12}
          sx={{ mt: { xs: 6, md: 0 } }}
        >
          <Typography variant="h3">No Posts</Typography>
          <Typography variant="h6" color="slategray">
            Try creating a new one
          </Typography>
        </Grid>
      );
    } else {
      content = posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={10} md={12} lg={12}>
          <PostCard post={post} />
        </Grid>
      ));
    }
  } else if (postsStatus === "failed") {
    content = <div>{postError}</div>;
  }

  let userProfile;
  if (userStatus === "loading") {
    userProfile = <UserProfileSkeleton repeatNumber={1} />;
  } else if (userStatus === "succeeded") {
    if (user) {
      userProfile = (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          item
          xs={12}
          sm={6}
          md={12}
          lg={12}
        >
          <Grid item>
            <UserProfile user={user} />
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              startIcon={<AddIcon />}
              color="secondary"
              sx={{ borderRadius: "20px" }}
              onClick={handleClickOpen}
            >
              Add Post
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      userProfile = (
        <Grid item xs={12} sm={6} md={12} lg={12}>
          Something went wrong, go back to home
        </Grid>
      );
    }
  }

  useEffect(() => {
    userStatus === "idle" && dispatch(fetchUser(userId));
  }, [userStatus, dispatch, userId]);

  useEffect(() => {
    postsStatus === "idle" && dispatch(fetchUserPosts(userId));
  }, [postsStatus, dispatch, userId]);

  return (
    <Container>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        flexDirection={{ xs: "column", md: "row" }}
        marginTop={2}
      >
        <Grid item xs={12} mb={{ xs: 0, md: 4 }}>
          <Fab variant="extended" color="white" onClick={GoBack}>
            <ArrowBackIosNewIcon sx={{ mr: { xs: 0, sm: 1 } }} />
            <Typography
              variant="button"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Back to Home
            </Typography>
          </Fab>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems={{ xs: "center", md: "start" }}
          item
          xs={12}
          md={4}
          lg={3}
        >
          {userProfile}
        </Grid>
        <Grid
          container
          item
          spacing={2}
          justifyContent="center"
          xs={12}
          md={7}
          lg={6}
        >
          <Grid item xs={12} sm={10} md={12} lg={12}>
            <Typography
              borderBottom={4}
              color="secondary"
              fontFamily="Montserrat"
              fontWeight="SemiBold"
              fontSize={{ xs: 36, md: 40 }}
              textAlign={{ xs: "center", sm: "left" }}
              sx={{ borderRadius: "4px" }}
            >
              FEED
            </Typography>
          </Grid>
          {content}
        </Grid>
      </Grid>
      <CreateNewPostDialogForm
        open={open}
        handleClose={handleClose}
        fullScreen={fullScreen}
        userId={userId}
      />
    </Container>
  );
};

export default UserPostsPage;
