import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectAllUsers } from "../features/users/usersSlice";
import { useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import UserCard from "../components/UserCard";
import SearchInput from "../components/SearchInput";
import { UserCardSkeleton } from "../components/UserCardSkeleton";

export const UsersPage = () => {
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  let content;
  if (userStatus === "loading") {
    content = <UserCardSkeleton repeatNumber={9} />;
  } else if (userStatus === "succeeded") {
    content = users.map((user) => (
      <Grid key={user.id} item xs={12} sm={6} md={4} lg={4}>
        <UserCard user={user} />
      </Grid>
    ));
  } else if (userStatus === "failed") {
    content = <div>{error}</div>;
  }

  useEffect(() => {
    userStatus === "idle" && dispatch(fetchUsers());
  }, [userStatus, dispatch]);

  return (
    <Container
      sx={{
        px: { xs: 0, sm: "24px" },
        paddingTop: { xs: "80px", sm: "120px" },
      }}
    >
      <Grid container spacing={{ xs: 0, sm: 2 }} mb={6} justifyContent="center">
        <Grid container item spacing={3} xs={10}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              fontSize={{ xs: 32, sm: 48, md: 64 }}
              textAlign={"center"}
            >
              Users Directory
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <SearchInput />
          </Grid>
        </Grid>
        {content}
      </Grid>
    </Container>
  );
};

export default UsersPage;
