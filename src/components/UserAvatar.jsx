import { Avatar, Badge, Stack, badgeClasses } from "@mui/material";

export const UserAvatar = ({ gender, status, imgSize, dotSize = 18 }) => {
  const imgPath = `/${gender}.png`;
  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{
          [`& .${badgeClasses.dot}`]: {
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: status === "active" ? "#3FF046" : "#929292",
          },
        }}
      >
        <Avatar sx={{ width: imgSize, height: imgSize }} src={imgPath} />
      </Badge>
    </Stack>
  );
};
