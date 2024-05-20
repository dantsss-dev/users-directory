import { Card, CardContent, Typography } from "@mui/material";

export const PostCard = ({ post }) => {
  return (
    <Card
      sx={{
        minHeight: 254,
        borderRadius: "12px",
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography
          variant="h3"
          fontFamily="Montserrat"
          fontWeight="Bold"
          lineHeight="135%"
          fontSize={20}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: "24px",
            fontFamily: "Montserrat",
            fontWeight: "Medium",
            lineHeight: "150%",
          }}
        >
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};
