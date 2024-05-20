import { Card, CardContent, Stack, Typography } from "@mui/material";
import { UserAvatar } from "./UserAvatar";

export const UserProfile = ({ user }) => {
  return (
    <Card
      sx={{
        borderRadius: { xs: "0px", sm: "12px" },
        border: "none",
        boxShadow: { xs: "none", md: 2 },
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <UserAvatar
            status={user.status}
            gender={user.gender}
            imgSize={140}
            dotSize={32}
          />
          <Stack>
            <Typography fontWeight="Bold" fontSize={20} textAlign="center">
              {user.name}
            </Typography>
            <Typography fontSize={12} fontWeight="Regular" textAlign="center">
              {user.email}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
