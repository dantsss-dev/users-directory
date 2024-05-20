import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPostStatus } from "../features/posts/postsSlice";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(resetPostStatus());
    navigate(`/user/${user.id}/posts`);
  };
  return (
    <Card
      sx={{
        borderRadius: { xs: "0px", sm: "12px" },
        boxShadow: { sx: 0, sm: 3 },
      }}
    >
      <CardActionArea>
        <CardContent onClick={handleOnClick}>
          <Stack
            direction={{ xs: "row", sm: "column" }}
            justifyContent={"start"}
            alignItems={"center"}
            spacing={2}
          >
            <UserAvatar
              status={user.status}
              gender={user.gender}
              imgSize={64}
            />
            <Stack>
              <Typography
                fontWeight={500}
                fontSize={16}
                textAlign={{ xs: "left", sm: "center" }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize={12}
                textAlign={{ xs: "left", sm: "center" }}
              >
                {user.email}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
